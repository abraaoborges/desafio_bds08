import './styles.css';

import ResultCard from 'components/ResultCard';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  cep: string;
};

type Address = {
  url: string;
  followers: string;
  location: string;
  name: string;
  avatar_url: string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${formData.cep}`)
      .then((response) => {
        setAddress(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  };

  return (
    <div className="cep-search-container">
      <div className="search-container">
        <h1 className="title">Encontre um perfil no Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              className="search-input"
              placeholder="Usuário Github"
              value={formData.cep}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      {address && (
        <>
          <div className="result-container-github">
            <div className="result-container-github-image">
              <img src={address.avatar_url} alt="" />
            </div>

            <div className="result-container-github-data">
              <h2 className="title-result">Informações</h2>

              <ResultCard title="Perfil:" description={address.url} />
              <ResultCard title="Seguidores:" description={address.followers} />
              <ResultCard title="Localidade:" description={address.location} />
              <ResultCard title="Nome:" description={address.name} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CepSearch;
