require("dotenv").config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {
    const newUserChannel = newMember.voiceChannel;
    const oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
      // User Joins a voice channel
      console.log('User Joined VC');
    } else if (newUserChannel === undefined) {
      // user left
      console.log('User Left VC');
    } else if (newUserChannel !== undefined && oldUserChannel !== undefined) {
      // User Switched VC
      console.log('User Switched VC');
    }
  }
};
