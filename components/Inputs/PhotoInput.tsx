import React, { ReactElement } from 'react'
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { fetcher } from '../../constants/fetcher';
import Api from '../../constants/api';

interface Props {
  setImage: any,
  image?: any
}

export default function PhotoInput({ image, setImage }: Props): ReactElement {
  const id = Math.random().toString();

  let photoFile: File;
  const onPhotoChange = (e) => {
    const input = e.target;

    if (input.files && input.files[0]) {
      photoFile = input.files[0]
      var reader = new FileReader();

      reader.onload = function (e) {
        const filePath = e.target.result
        setImage(filePath);
      }

      reader.readAsDataURL(photoFile);

      const fileFormData = new FormData();

			fileFormData.append("file", photoFile);
			fileFormData.append("AttachType", "0");

			fetcher
				.fetch(Api.UploadFile, {
					method: "POST",
					body: fileFormData,
				})
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					} else {
						return {
							path: "",
						};
					}
        })
        .then((responseJson) => {
          setImage(responseJson.path)
        });
    }
  }
  const onPhotoRemove = () => {
    setImage(undefined);
    photoFile = null;
  }
  return (
    <div className="photo-wrapper">
      {!image && <label htmlFor={id} className="photo-container">
        <div>
          <div className="photo-icon">
            <Icon name="ei-camera" size={48} color="white" />
          </div>
          <div className="photo-message">Загрузить фото</div>
        </div>
      </label>}

      {image && <img className="photo-preview" src={image} alt="Загруженное фото" />}

      <input accept="image/jpeg,image/png" onChange={onPhotoChange} type="file" id={id} hidden />

      {image && <button onClick={onPhotoRemove} type="button" className="link primary clear">убрать</button>}

      <style jsx>{`
        .photo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 260px;
          height: 260px;
          background-color: ${Colors.Primary};
          transition: background-color 0.3s ease-in;
          cursor: pointer;
          color: white;
        }
        .photo-container:hover {
          background-color: rgb(36, 116, 190);
        }
        .photo-preview {
          width: 260px;
          height: 260px;
          object-fit: cover;
        }
        .photo-message,
        .photo-icon {
          text-align: center;
        }
        @media screen and (max-width: 576px) {
            .photo-container {
            width: 140px;
            height: 140px;
          }
        }
        `}</style>
    </div>
  );
}
