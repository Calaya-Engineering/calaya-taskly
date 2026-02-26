import { signAuthToken } from "@/lib/jwt";

async function run() {
    const token = await signAuthToken({
        email: "md@calayaengineering.com",
        role: "MD"
    });
    console.log(token);
}

run();
