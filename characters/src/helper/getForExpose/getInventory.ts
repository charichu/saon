export async function getInventory(character: any) {

    return character.belongings.items;

}