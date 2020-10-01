require('dotenv').config();
const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
      // User Joins a voice channel
      
      switch (newMember.voiceChannelID) {
        case process.env.VC1ID:
          let rolevc1 = newMember.guild.roles.cache.find(r => r.name === "vc-1");
          newUserChannel.member.roles.add(rolevc1).catch(console.error);

          break;
        case process.env.VC2ID:
          let rolevc2 = newMember.guild.roles.cache.find(r => r.name === "vc-2");
          newUserChannel.member.roles.add(rolevc2).catch(console.error);

          break;
        case process.env.VC3ID:
          let rolevc3 = newMember.guild.roles.cache.find(r => r.name === "vc-3");
          newUserChannel.member.roles.add(rolevc3).catch(console.error);

          break;
        case process.env.VC4ID:
          let rolevc4 = newMember.guild.roles.cache.find(r => r.name === "vc-4");
          newUserChannel.member.roles.add(rolevc4).catch(console.error);

          break;

        default:
          break;
      }
    } else if (newUserChannel === undefined) {
      let rolevc1 = oldUserChannel.guild.roles.cache.find(r => r.name === "vc-1");
      let rolevc2 = oldUserChannel.guild.roles.cache.find(r => r.name === "vc-2");
      let rolevc3 = oldUserChannel.guild.roles.cache.find(r => r.name === "vc-3");
      let rolevc4 = oldUserChannel.guild.roles.cache.find(r => r.name === "vc-4");
      // User leaves a voice channel
      if(oldUserChannel.member.roles.cache.has(rolevc1)){
        oldUserChannel.member.roles.remove(rolevc1).catch(console.error);
      }
      if(oldUserChannel.member.roles.cache.has(rolevc2)){
        oldUserChannel.member.roles.remove(rolevc2).catch(console.error);
      }
      if(oldUserChannel.member.roles.cache.has(rolevc3)){
        oldUserChannel.member.roles.remove(rolevc3).catch(console.error);
      }
      if(oldUserChannel.member.roles.cache.has(rolevc4)){
        oldUserChannel.member.roles.remove(rolevc4).catch(console.error);
      }
    }
  }
};
