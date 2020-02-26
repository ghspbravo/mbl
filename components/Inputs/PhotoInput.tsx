import React, { ReactElement } from 'react'
import Icon from '../Icon';
import Colors from '../../constants/colors';

interface Props {
  onChange: any,
  onRemove: any,
  image?: any,
}

export default function PhotoInput({ onChange, onRemove, image }: Props): ReactElement {
  const id = Math.random().toString();
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

      <input accept="image/jpeg,image/png" onChange={onChange} type="file" id={id} hidden />

      {image && <button onClick={onRemove} type="button" className="link primary clear">убрать</button>}

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
