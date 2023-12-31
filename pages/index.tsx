import Head from "next/head";
import { Grid } from "@components/UI";
import { About, ArtistCard } from "@components/common";
import { PlaylistCard } from "@components/Playlist/PlaylistCard";
import { getAllPlaylistsQuery } from "@graphql/queries";
import { client } from "@lib/apollo";

export async function getStaticProps() {
  const { data } = await client.query({
    query: getAllPlaylistsQuery,
  });

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

const Home = (props: { data: any; error: any }) => {
  const { data, ...rest } = props;

  return (
    <div>
      <Head>
        <title>Lofi-App by Achraf Garai</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <div className="col-span-2">
          <h1 className="text-2xl font-medium">Playlists</h1>
          <div className="flex flex-col gap-16">
            {data.playlists.map((playlist: any) => (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                img={playlist.imageUrl}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-xl font-medium">Top Artists</h1>
          <div className="flex flex-col gap-4">
            {data.Artists.map((artist: any) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                id={artist.id}
                imgUrl={artist.imageUrl}
              />
            ))}
          </div>
          <About />
        </div>
      </Grid>
    </div>
  );
};

export default Home;
function cn(root: any): string | undefined {
  throw new Error("Function not implemented.");
}
