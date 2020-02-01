import React, { ReactElement, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import Icon from 'react-evil-icons';

interface Props {
  children: JSX.Element
}

/**
 * Inherits min-height to display loader in center of element
 */
export default function Lazy({ children }: Props): ReactElement {
  const [loaded, loadedSet] = useState(false);

  const onLoadHandler = () => {
    loadedSet(true);
  }
  return (
    <div className="lazy">
      <LazyLoad
        offsetVertical={300}
        onContentVisible={onLoadHandler}
      >
        {children}
      </LazyLoad>

      {!loaded && <div className='loader'>
        <Icon name="ei-spinner-3" size="m" />
      </div>}

      <style jsx>{`
        .lazy {
          position: relative;
          min-height: inherit;
        }
        .loader {
          position: absolute;
          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);
        }
        `}</style>
    </div>
  )
}
