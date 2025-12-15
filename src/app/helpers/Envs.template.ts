export class Envs {

    public static get URL_BACK(){
        return "http://localhost:3000/api/v1/"; // url del backend
    }


    public static get KEY_SECRET_CRYPTO(){
        return ""; // contraseña para encryptar el body que se alojara en el local storage
    }

    public static get KEY_USER_LS(): string{
        return "";       // contraseña para encryptar la key de usuario para local storage
    }

    public static get KEY_TOKEN_LS(): string{
        return ""; // contraseña para encryptar la key de token para local storage
    }


}
