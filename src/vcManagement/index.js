require('dotenv').config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {
    const vc1role = newMember.guild.roles.cache.find((role) => role.name === 'vc-1');
    const vc2role = newMember.guild.roles.cache.find((role) => role.name === 'vc-2');
    const vc3role = newMember.guild.roles.cache.find((role) => role.name === 'vc-3');
    const vc4role = newMember.guild.roles.cache.find((role) => role.name === 'vc-4');

    if ((oldMember.channelID === null) && (newMember.channelID !== null)) {
      switch (newMember.channelID) {
        case process.env.VC1ID:
          newMember.member.roles.add(vc1role).catch(console.error);
          break;
        case process.env.VC2ID:
          newMember.member.roles.add(vc2role).catch(console.error);

          break;
        case process.env.VC3ID:
          newMember.member.roles.add(vc3role).catch(console.error);


          break;
        case process.env.VC4ID:
          newMember.member.roles.add(vc4role).catch(console.error);

          break;
        default:
          break;
      }
    } else if ((oldMember.channelID !== null) && (newMember.channelID === null)) {
      newMember.member.roles.remove(vc1role).catch(console.error);
      newMember.member.roles.remove(vc2role).catch(console.error);
      newMember.member.roles.remove(vc3role).catch(console.error);
      newMember.member.roles.remove(vc4role).catch(console.error);
    } else if ((oldMember.channelID !== null) && (newMember.channelID !== null)) {
      switch (newMember.channelID) {
        case process.env.VC1ID:
          newMember.member.roles.add(vc1role).catch(console.error);
          newMember.member.roles.remove(vc2role).catch(console.error);
          newMember.member.roles.remove(vc3role).catch(console.error);
          newMember.member.roles.remove(vc4role).catch(console.error);
          break;
        case process.env.VC2ID:
          newMember.member.roles.add(vc2role).catch(console.error);
          newMember.member.roles.remove(vc1role).catch(console.error);
          newMember.member.roles.remove(vc3role).catch(console.error);
          newMember.member.roles.remove(vc4role).catch(console.error);
          break;
        case process.env.VC3ID:
          newMember.member.roles.add(vc3role).catch(console.error);
          newMember.member.roles.remove(vc1role).catch(console.error);
          newMember.member.roles.remove(vc2role).catch(console.error);
          newMember.member.roles.remove(vc4role).catch(console.error);
          break;
        case process.env.VC4ID:
          newMember.member.roles.add(vc4role).catch(console.error);
          newMember.member.roles.remove(vc1role).catch(console.error);
          newMember.member.roles.remove(vc2role).catch(console.error);
          newMember.member.roles.remove(vc3role).catch(console.error);
          break;
        default:
          newMember.member.roles.remove(vc1role).catch(console.error);
          newMember.member.roles.remove(vc2role).catch(console.error);
          newMember.member.roles.remove(vc3role).catch(console.error);
          newMember.member.roles.remove(vc4role).catch(console.error);
          break;
      }
    }
  }
};
