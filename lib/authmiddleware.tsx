import { cookies } from "next/headers";
import { tokenDecoder, tokenVerifier } from "@/components/tokenmethods";

export default async function AuthMiddleWare() {
    const cookieStore = await cookies();
    const token =  cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized: Kindly Login or Sign Up");
    }

    if (!tokenVerifier(token)) {
        throw new Error("Forbidden: Invalid or expired token");
    }

    const decodedToken = tokenDecoder(token);
    if (!decodedToken || typeof decodedToken !== "object" || !("id" in decodedToken)) {
        throw new Error("Forbidden: Invalid token data");
    }

    return decodedToken;
}
