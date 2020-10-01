require("dotenv").config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {
    const newUserChannel = newMember.voiceChannel;
    const oldUserChannel = oldMember.voiceChannel;

    console.log(oldMember);
    console.log('--------------------------------');
    console.log(newMember);

  }
};
