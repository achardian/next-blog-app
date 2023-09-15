import ShortUniqueId from "short-unique-id";

function convertToSlug(text: string) {
  const uid = new ShortUniqueId({ length: 10 });
  return `${text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}-${uid.rnd().toLowerCase()}`;
}

export default convertToSlug;
