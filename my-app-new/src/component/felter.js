 export default function Felter({ setfelter, items,felter  ,typefelter, key}) {
 const getNestedValue = (obj, path) => {
  if (path.includes("_")) {
    const [a, b] = path.split("_");
    return obj?.[a]?.[b];
  } 
  else {
    return obj?.[path];
  }
};
 return (
 <div className="ptcot">
       
            <select onChange={(e) => setfelter({ ...felter, [typefelter]: e.target.value })}>
              <option value="">All {typefelter}</option>
              {items &&
                [...new Set(items.map((items) =>  getNestedValue(items, typefelter)   ))].map(
                  (role, index) => {
                    return (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    );
                  }
                )}
            </select>
        </div>
      );
    }