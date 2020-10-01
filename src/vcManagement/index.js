require("dotenv").config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {

    // console.log(oldMember);
    // console.log('--------------------------------');
    // console.log(newMember);

    // Sometimes it's null, sometimes it's undefined... Why!!!!!!??????
    if ((oldMember.voice.channelID === undefined || oldMember.voice.channelID === null) && (newMember.channelID !== undefined || newMember.voice.channelID !== null)) {
      console.log('Joined a Channel');
    } else if ((oldMember.voice.channelID !== undefined || oldMember.voice.channelID !== null) && (newMember.channelID === null || newMember.voice.channelID === undefined)) {
      console.log('Left a Channel');
    } else if ((oldMember.voice.channelID !== undefined || oldMember.channelID !== null) && (newMember.voice.channelID !== undefined || newMember.voice.channelID !== null)) {
      console.log('Switched Channel');
    }
  }
};
