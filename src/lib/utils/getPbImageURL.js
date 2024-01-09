export function getPbImageURL(item, fileName = 'photo') {
  return `https://ryujin.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}

export function getPbImageURL_2(item, fileName = 'photo_large') {
  return `https://ryujin.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}

export function getPbImageURL_3(item, fileName = 'nutritional') {
  return `https://ryujin.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
