export function getPbImageURL(item, fileName = 'photo') {
  return `https://ryujin.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
