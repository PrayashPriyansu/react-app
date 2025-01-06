import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  //Step 1: create the cabin
  let query = supabase.from("cabins");

  //A) For create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) For edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("New cabin could not be created");
  }

  if (hasImagePath) return data;

  //Step 2:if succesfull upload the image
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  //Step 3:delete cabin if image upload failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.error(storageError);
    throw new Error(
      "Cabin could not be created as image could not be uploaded "
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
