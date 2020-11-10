import Link from 'next/link';

const showCharacters = ({ currentUser, characters }) => {
  const characterList = characters.map((character) => {

    return (
      <tr key={character.id}>
        <td>{character.name}</td>
        <td>{character.stats}</td>
        <td>
          <Link href="/characters/[characterId]" as={`/characters/${character.id}`}>
            <a>Details</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>characters</h1>
      <table className="table text-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stats</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{characterList}</tbody>
      </table>
    </div>
  );
}
  
showCharacters.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/characters');

    return { characters: data}
  };
  
  export default showCharacters;