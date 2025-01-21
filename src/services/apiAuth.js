import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  console.log(fullName);
  await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  //we check if there is an active session
  //this gets the data from the local storage

  if (!session.session) return null; //no current user

  //while we could get the user info from this session or local storage

  //it is more secure to redownload all the data

  //if there is a valid session fetch the the current user
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //2. Upload the avtar image

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { err } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (err) throw new Error(err.message);

  //3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
