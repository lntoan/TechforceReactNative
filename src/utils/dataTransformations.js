import moment from 'moment';
import {shortname,teamlogoImage,teamlogoAssesst} from './shortname';
import {Platform} from 'react-native';
import 'moment-timezone';

const getMultimediaUrlByFormat = (multimedia, format,fieldname) => {
  console.log('getMultimediaUrlByFormat');
  if (!multimedia) {
    console.log('chet 1');
    return 'https://static01.nyt.com/images/2017/08/28/business/28BRAINWAVES1/28BRAINWAVES1-thumbStandard.jpg';
  }

  const matchingFormat = multimedia.find(media => media.format === format);
  if (!matchingFormat) {
    console.log('chet 2');
    return 'https://static01.nyt.com/images/2017/08/29/insider/28UBERsub/28UBERsub-thumbStandard-v3.jpg';
  }else{
    console.log('chet ne');
    return matchingFormat;
  }

  return 'https://static01.nyt.com/images/2017/08/27/world/middleeast/27propaganda-promo/27propaganda-promo-thumbStandard.png';
};

const convertTimeZone = (time) => {
  moment.locale('vn');
  return moment(time);
};

export const reshapefixturesMatchDayData = premierleagueReducer => (
  //console.log('reshapefixturesMatchDayData');
  premierleagueReducer.map(({ date, homeTeamName, awayTeamName, result, status, _links }) => ({

    id: _links.self.href,//homeTeamName + awayTeamName,
    homeTeamName: shortname[homeTeamName],
    awayTeamName: shortname[awayTeamName],
    homeTeamLogo: Platform.OS === 'ios' ? teamlogoAssesst[homeTeamName]:teamlogoImage[homeTeamName],
    awayTeamLogo: Platform.OS === 'ios' ? teamlogoAssesst[awayTeamName]:teamlogoImage[awayTeamName],
    time: convertTimeZone(date).format("HH:mm"),
    date: convertTimeZone(date).format("DD/MM"),
    goalsHomeTeam: result.goalsHomeTeam,
    goalsAwayTeam: result.goalsAwayTeam,
    status: status,


  }))
);

export const reshapePremierLeagueData = premierleagueReducer => (
  premierleagueReducer.map(({ code, name, shortName, crestUrl, squadMarketValue, _links }) => ({

    id: code,
    shortName: shortName || '',
    name: name,
    logo: crestUrl,
    squadMarketValue: squadMarketValue == null ? 0 : squadMarketValue,
    // squadteam: getMultimediaUrlByFormat(_links, 'players')

  }))
);

export const reshapeNewsData = rnnyReducer => (
  rnnyReducer.map(({ abstract, byline, geo_facet, multimedia, published_date, title, url }) => ({
    id: url,
    description: abstract || '',
    author: byline ? byline.replace('By ', '') : '',
    location: geo_facet.length > 0 ? geo_facet[0] : '',
    imageUrl: getMultimediaUrlByFormat(multimedia, 'thumbLarge'),
    date: moment(published_date).format('MMM Do YYYY'),
    title: title,
    url: url
  }))
);


export const filterNewsBySearchTerm = (newsItems, searchTerm) => {
  // returns an empty list if you haven't typed anything
  if (searchTerm.length === 0) {
    return [];
  }
  return newsItems.filter(({ description, author, title }) => (
    description.toLowerCase().indexOf(searchTerm) > -1 ||
    author.toLowerCase().indexOf(searchTerm) > -1 ||
    title.toLowerCase().indexOf(searchTerm) > -1
  ));
};
