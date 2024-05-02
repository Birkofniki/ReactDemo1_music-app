const clientId= "78be9157b87f41059933a571edc31537";
const redirectUri="http://localhost:3000";

let accessToken;

const Spotify={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        const accessTokenMatch= window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken=accessTokenMatch[1];
            const expiresIn= Number(expiresInMatch[1]);
            window.setTimeout(()=>(accessToken=""), expiresIn * 1000);
            window.history.pushState("Access Token", null,"/");
            return accessToken;
        } else{
            const accessUrl="https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=token&scope=playlist-modify-public&redirect_url=${redirectUri}"; //the url that will get generated to the browser
            window.location=accessUrl;

        }
    }, //making the search criteria function below
    search(term){
        const accessToken=Spotify.getAccessToken();
        return fetch("https://api.spotify.com/v1/search?type=track&g=${term}", {
            headers:{
                Authorization:"Bearer ${accessToken}"                
            }

        }).then(response=>{
            return response.json();
        })
        .then(jsonResponse=>{
            return response.json();
        })
        then(jsonResponse=>{
            if(!jsonResponse.tracks){
                return[]; //return an empty array if not json response
            }
            return jsonResponse.tracks.items.map(track=>({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });

    },  
    
    //starting another block below..the save block
    savePlaylist(name, trackUris){
        if(!name || !trackUris,length){
            return;
        }
        const accessToken= Spotify.getAccessToken();
        const headers= {Authorization:"Bearer ${accessToken}"};
        let userId;

        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response=> response.json())
        .then(jsonResponse => {
            userId= jsonResponse.id;
            return fetch("https://api.spotify.com/v1/users/${userId}/playlists",{ 

            headers: headers,
            methods: "POST",
            body: JSON.stringify({name:name})
        })
        .then(response => response.json())
        .then(jsonResponse =>{
            const playlistId=jsonResponse.Id;
            return fetch{
                "https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks",
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ uris: trackUris })
                }
            };
            });
        });
    }
};

export default Spotify;

//completed the Spotify file in the util component