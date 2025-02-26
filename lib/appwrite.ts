import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from "expo-web-browser";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export const config = {
    platform: 'com.luxliving.luxliving',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
     .setEndpoint(config.endpoint!)
     .setProject(config.projectId!)
     .setPlatform(config.platform)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
     try{
        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
        if(!response) throw new Error('Something went wrong');

        const  browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if(browserResult.type !== 'success') throw new Error('Something broke 💔');

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if(!secret || !userId) throw new Error('Something went wrong with the session');

        const session = await account.createSession(secret, userId);

        if(!session) throw new Error('failed to create session');

        return true;

     } catch(error) {
        console.error(error);
        return false;
     }
     
}

export async function logout() {
    try{
     await account.deleteSession('current');
     return true;
    }catch(error) {
       console.error(error);
       return false;
    }
}

export async function getUser() {
    try{
    const response = await account.get();
    
    if(response.$id){
        const userAvatar = avatar.getInitials(response.name);

        return {
            ...response,
            avatar: userAvatar.toString(),
        }
    }
    }catch(error) {
        console.error(error);
        return false;
    }
}