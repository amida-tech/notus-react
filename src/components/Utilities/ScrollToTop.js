import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useContext } from 'react';
import { DatastoreContext } from '../../context/DatastoreProvider'

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const parmesan = useParams()['*'].split('/').at(-1)
  const { datastore } = useContext(DatastoreContext);
  const measures = Object.values(datastore.currentResults).map((obj) => obj.measure)

  useEffect(() => {

    if (parmesan === 'members' || parmesan === measures.find(measure => measure === parmesan)) {
      return;
    }

    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

  }, [pathname]);

  return null;
}