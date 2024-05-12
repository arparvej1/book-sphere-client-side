import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const CheckLibrarian = () => {
  const { user, librarians } = useContext(AuthContext);
  const [activeLibrarian, setActiveLibrarian] = useState(false);

  useEffect(() => {
    const filtered = librarians.filter(man => man?.email?.includes(user.email));
    if (filtered.length > 0) {
      setActiveLibrarian(true)
    }
  }, []);

  return activeLibrarian;
};

export default CheckLibrarian;