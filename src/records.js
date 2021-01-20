import React, {useState} from "react";
import RecordCard from './recordCard.js';

export default function SearchRecords(){

    //states for input query, detail
    const [query, setQuery] = useState('');
    // state for details
    const [details, setDetails] = useState([]);


    const searchRecords = async (e) => {
        e.preventDefault();
        


        //const url = `https://api.themoviedb.org/3/search/movie?api_key=c97f243f9daf9ef0f7ab24d5bf6670d1&language=en-US&query=${query}&page=1&include_adult=false`;        
        const url = 'https://api.enye.tech/v1/challenge/records';
        try {
            const res = await fetch(url);
            const data = await res.json();
            setDetails(data.records.profiles);
            console.log(data);
        }catch(err){
            console.error(err);
        }  
    }

    return (
        <>
            <form className="form" onSubmit={searchRecords}>
                <label className="label" htmlFor="query"><b>Transaction Detail:</b></label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {details.filter(detail => detail.FirstName).map(detail => (
                  <RecordCard detail={detail} key={detail.MacAddress}/>  
                ))}
            </div>   
        </>
    )
}
