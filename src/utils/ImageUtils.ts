import _ from "lodash";

const getBase64ImageFromUrl = async (imageUrl: string) => {
  if (!imageUrl || _.isEmpty(imageUrl)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject("Url is empty!");
  }
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const res = await fetch(proxyurl + imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );

    reader.onerror = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject();
    };
    reader.readAsDataURL(blob);
  });
};

const getBase64ImageInImageData = async (imageUrl: string) => {
  if (!imageUrl || _.isEmpty(imageUrl)) {
    return "";
  }
  const base64String: unknown = await getBase64ImageFromUrl(imageUrl);
  const jpgBase64 = (base64String as string).replace(
    "data:application/octet-stream;base64",
    "data:image/jpg;base64"
  );
  return jpgBase64;
};
const getBase64ListFromUrls = async (imageUrls: string[]) => {
  const base64List = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < imageUrls.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    const base64String = await getBase64ImageFromUrl(imageUrls[index]);
    const jpgBase64 = (base64String as string).replace(
      "data:application/octet-stream;base64",
      "data:image/jpg;base64"
    );
    base64List.push(jpgBase64);
  }
  return base64List;
};

function getBase64FromLocal(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function getImageSer(url: string, width: any, height: any, fit: boolean) {
  if (_.isEmpty(url)) {
    return "images/default.png";
  }
  let urlResult = `${url}?`;
  if (width) {
    urlResult += `w=${width}`;
  }
  if (height) {
    urlResult += `&h=${height}`;
  }
  if (fit) {
    urlResult += `&fit=crop`;
  }
  return urlResult;
}

export default {
  getBase64ImageFromUrl,
  getBase64ListFromUrls,
  getBase64FromLocal,
  getBase64ImageInImageData,
  getImageSer,
};
