const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const userAvatar = document.querySelector('.ad-form-header__preview img');
const userAvatarChooser = document.querySelector('.ad-form-header__input');
const apartmentPhoto = document.querySelector('.ad-form__photo');
const apartmentPhotoChooser = document.querySelector('.ad-form__input');

const photoPreviewHandler = (fileChooser, photoPreview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (photoPreview.tagName === 'IMG') {
      photoPreview.src = URL.createObjectURL(file);
    } else {
      const createdPhotoPreview = document.createElement('img');
      createdPhotoPreview.src = URL.createObjectURL(file);
      createdPhotoPreview.style.width = '70px';
      createdPhotoPreview.style.height = '70px';
      createdPhotoPreview.alt = 'Фото жилья';
      photoPreview.append(createdPhotoPreview);
    }
  }
};

const resetImages = (element) => {
  if (element.tagName === 'IMG') {
    element.src = 'img/muffin-grey.svg';
  } else {
    const elementImg = element.querySelector('img');
    if (elementImg) {
      elementImg.remove();
    }
  }
};

const resetAllImages = () => {
  [userAvatar, apartmentPhoto].forEach((element) => {resetImages(element);});
};

userAvatarChooser.addEventListener('change', (evt) => {
  photoPreviewHandler(evt.target, userAvatar);
});

apartmentPhotoChooser.addEventListener('change', (evt) => {
  photoPreviewHandler(evt.target, apartmentPhoto);
});

export {resetAllImages};
