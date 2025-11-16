import {SHA256, AES, enc} from "crypto-js";
import { Envs } from "./Envs";


export class Crypto {

    public static hashKey(key: string): string{
        return SHA256(key).toString();
    }

    public static hashContent( content: string ): string {
        return AES.encrypt(content, Envs.KEY_SECRET_CRYPTO).toString();
    }

    public static decryptContent<T>( content: string): T {
        const decrypt = AES.decrypt(content.trim(), Envs.KEY_SECRET_CRYPTO).toString(enc.Utf8);
        return JSON.parse(decrypt) as T;
    }


}