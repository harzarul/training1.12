import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { FormField, Loader } from '../components';
import { getRandomPrompt } from "../utils";


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  //<input onChange={handleChange}/>
  //spread, where : what
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value});
  };
  
  //<button onClick={handleSurpriseMe}/>
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  };

  //<button onClick={generateImage}/>
  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Enter your prompt")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form}),
        })
        await response.json();
        alert("Success");
        navigate("/");
      } catch (error) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>
          Pikasot
        </h1>
        <p className='mt-2 text-yellow text-[14px] max-w-[500px]'>
          Translate your word into image
        </p>
      </div>

      <form className='mt-16 max-w-3xl'
        onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex: John Labu"
            value={form.name}
            handleChange={handleChange}/>
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A turle kung fu master on an island"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}/>
          <div className='relative bg-black border border-yellow text-sm rounded-lg w-64 h-64 p-3 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt}
                className="w-full h-full object-contain"/>
            ) : (
              <img src={preview} alt="preview"
                className='w-9/12 h-9/12 object-contain'/>
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-black rounded-lg'>
                <Loader/>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-start items-center'>
          <div className='mt-5 flex gap-5'>
            <button
              type='button'
              onClick={generateImage}
              className="text-black bg-yellow font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className='mt-5 flex gap-5'>
            <button
              type='submit'
              className="text-black bg-yellow font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3">
              {loading ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreatePost