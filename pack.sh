#!/bin/bash
set -e

extension_name="chrome-tab-info"
extension_files=(
    background.js
    context_script.js
    manifest.json
)

packed_zip="${extension_name}.zip"
packed_crx="${extension_name}.crx"
temp_files=(
    private.pem
    public.pem
    signature.bin
    "${packed_zip}"
)

# Create a ZIP file containing the extension files.
zip -r "${packed_zip}" "${extension_files[@]}"

# Generate a private key for signing the extension.
#openssl genpkey -algorithm RSA -outform DER -out private.pem -pkeyopt rsa_keygen_bits:2048
openssl ecparam -name prime256v1 -genkey -noout -out private.pem

# Extract the public key from the private key.
#openssl rsa -pubout -in private.pem -outform DER -out public.pem
openssl ec -in private.pem -pubout -outform DER -out public.pem

# Generate the CRX3 file by combining the signature, public key, and ZIP file.
#openssl dgst -sha256 -binary -sign private.pem <(cat "${packed_zip}" public.pem) > signature.bin
openssl dgst -sha256 -sign private.pem <(cat "${packed_zip}" public.pem) > signature.bin
cat "${packed_zip}" public.pem signature.bin > "${packed_crx}"

# Clean up temporary files.
rm -f "${temp_files[@]}"

echo "Extension packed successfully!"
echo "Created ${packed_crx}"
