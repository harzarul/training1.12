import React, { useState, useEffect} from 'react';
import { Card, FormField, Loader } from "../components";

const RenderCards = ({data, title}) => {
  if(data?.length > 0){
    return (
      data.map((post) => <Card key={post._id} {...post}/>)
    );
  }

  return(
    <h2 className='mt-5 font-bold text-yellow text-xl uppercase'>
      {title}
    </h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allposts, setAllposts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.ok){
        const result = await response.json();
        setAllposts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() =>{
    fetchPosts();
  },[]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allposts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>
          Community Gallery
        </h1>
        <p className='mt-2 text-yellow text-[14px] max-w-[500px]'>
          Browse through a collection of image
        </p>
      </div>

      <div className='mt-16'>
        <FormField
        labelName="Search posts"
        type="text"
        name="text"
        placeholder="Search something..."
        value={searchText}
        handleChange={handleSearchChange}/>
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (
          <>
          {searchText && (
            <h2 className='font-medium text-yellow text-xl mb-3'>
              Results for <span className='text-white'>{searchText}</span>
            </h2>
          )}
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {searchText ? (
              <RenderCards data={searchedResults}
              title="No Search Results Found"/>
            ) : (
              <RenderCards data={allposts}
                title="No Posts Yet"/>
            )}
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home