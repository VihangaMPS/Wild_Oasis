import supabase from "./supabase.js";

export async function login({email, password}) {

    let { data, error } = await supabase.auth.signInWithPassword({email: email, password: password});

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const {data: session} = await supabase.auth.getSession();

    if (!session.session) return null;

    const {data, error} = await supabase.auth.getUser();

    return data?.user;
}

export async function logout() {
    const {error} = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}