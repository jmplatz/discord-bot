require("dotenv").config();

const guildID = process.env.GUILD_ID;

module.exports = async (oldMember, newMember) => {
  if (oldMember.guild.id === guildID || newMember.guild.id === guildID) {
    const newUserChannel = newMember.voiceChannel;
    const oldUserChannel = oldMember.voiceChannel;

    // console.log(oldMember);
    // console.log('--------------------------------');
    // console.log(newMember);

    // Sometimes it's null, sometimes it's undefined... Why!!!!!!??????
    if ((oldUserChannel.channelID === undefined || oldUserChannel.channelID === null) && (newUserChannel.channelID !== undefined || newUserChannel.channelID !== null)) {
      console.log('Joined a Channel');
    } else if ((oldUserChannel.channelID !== undefined || oldUserChannel.channelID !== null) && (newUserChannel.channelID === null || newUserChannel.channelID === undefined)) {
      console.log('Left a Channel');
    } else if ((oldUserChannel.channelID !== undefined || oldUserChannel.channelID !== null) && (newUserChannel.channelID !== undefined || newUserChannel.channelID !== null)) {
      console.log('Switched Channel');
    }
  }
};
