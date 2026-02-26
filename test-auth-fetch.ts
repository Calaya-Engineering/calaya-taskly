
import dotenv from "dotenv";
dotenv.config();

const cloudinaryUrl = process.env.CLOUDINARY_URL;
// Parse: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
const match = cloudinaryUrl?.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
if (!match) {
    console.error("Invalid CLOUDINARY_URL");
    process.exit(1);
}
const [, apiKey, apiSecret, cloudName] = match;

const testUrl = "https://res.cloudinary.com/dazwrdush/image/upload/v1771986227/calaya-documents/file_aeb7gi.pdf";

async function testAuthFetch() {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    console.log("Testing fetch with Basic Auth...");

    try {
        const resp = await fetch(testUrl, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        console.log(`Status: ${resp.status} ${resp.statusText}`);
        if (resp.headers.has("x-cld-error")) {
            console.log("Error:", resp.headers.get("x-cld-error"));
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

testAuthFetch();
