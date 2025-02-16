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
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); //data koji dobijamo iz forme ima isti oblik kao data iz supabase-a, zato ovo radi

  // B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single(); //da bi vratili novi kreirani objekat treba nam .select() i .single()

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin IF there is an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created"
    );
  }
  return data;
}

// OVO JE KOD AKO NE ZELIM DA DODAJEM SLIKU U STORAGE AKO JE VEC IMA TAMO!!!
// export async function createEditCabin(newCabin, id) {
//   // Check if the image is already a URL
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   // Generate a new image path only if a new image (file) is provided
//   const imageName = hasImagePath
//     ? null
//     : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
//   const imagePath = hasImagePath
//     ? newCabin.image // Keep the existing URL
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // New image path

//   // 1. Create/Edit cabin
//   let query = supabase.from("cabins");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) EDIT
//   if (id)
//     query = query
//       .update({ ...newCabin, image: imagePath })
//       .eq("id", id)
//       .select();

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be created");
//   }

//   // 2. Upload image (only if a new image is provided)
//   if (!hasImagePath) {
//     const { error: storageError } = await supabase.storage
//       .from("cabin-images")
//       .upload(imageName, newCabin.image);

//     // 3. Delete cabin IF there is an error uploading image
//     if (storageError) {
//       await supabase.from("cabins").delete().eq("id", data.id);
//       console.error(storageError);
//       throw new Error(
//         "Cabin image could not be uploaded, and the cabin was not created"
//       );
//     }
//   }

//   return data;
// }

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
