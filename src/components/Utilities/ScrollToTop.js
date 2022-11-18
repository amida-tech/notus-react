import { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { DatastoreContext } from '../../context/DatastoreProvider'

// default application scroll after rerender behavior
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lastParameter = useParams()['*'].split('/').at(-1)
  const { datastore } = useContext(DatastoreContext);
  const measures = Object.values(datastore.currentResults).map((obj) => obj.measure)

  useEffect(() => {
    if (lastParameter === 'members' || lastParameter === measures.find((measure) => measure === lastParameter)) {
      return;
    }

    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
