

           export default function Search({ feltered,typefelter }) {
 
 return (
 <div className="ptcot">
        <input
            type="text"
            placeholder="🔍 Search"

            onChange={(e) => feltered(e.target.value)}
          />

        </div>
      );
    }