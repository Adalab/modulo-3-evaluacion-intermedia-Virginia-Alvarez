const callToApi = ()=>{
    return fetch ('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/adalabers-v1/promo-radsajsd.json')
    .then ((response) => response.json())
    .then ((response) =>{

        const result = response.results.map((adalaber) => {
            const filteredAdalaber = {
                "id" : adalaber.id,
                "name" : adalaber.name,
                "counselor" : adalaber.counselor,
                "speciality" : adalaber.speciality,
                "social_networks" : adalaber.social_networks
            }

            return filteredAdalaber;
        })

        return result;
    })

}

export default callToApi;