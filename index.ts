import AWS from 'aws-sdk';
import firebase from 'firebase/app';
import 'firebase/database';
import fetch from 'node-fetch';

firebase.initializeApp({
  apiKey: 'AIzaSyBK0Qxvg1GL2lMa1gWyZGNmK_v0o25d6jc',
  authDomain: 'poc-focuspoint.firebaseapp.com',
  databaseURL: 'https://poc-focuspoint.firebaseio.com',
  projectId: 'poc-focuspoint',
  storageBucket: 'poc-focuspoint.appspot.com',
  messagingSenderId: '484040658105',
  appId: '1:484040658105:web:9f5995455813c0981a1f68',
});

AWS.config.update({ region: 'eu-west-1' });

const R = new AWS.Rekognition();

const getBlob = async (imageUrl: string) => (await fetch(imageUrl)).buffer();

const getRekognitionData = async (imageUrl: string) => {
  try {
    const Bytes = await getBlob(imageUrl);
    const { Labels } = await R.detectLabels({ Image: { Bytes } }).promise();
    const { FaceDetails } = await R.detectFaces({ Image: { Bytes } }).promise();
    const { TextDetections } = await R.detectText({ Image: { Bytes } }).promise();
    return { imageUrl, Labels, FaceDetails, TextDetections };
  } catch (e) {
    console.error('e', e);
    return null;
  }
};

const urls = [
  'https://lh3.googleusercontent.com/c-Ljcw1POJijM4TxEJVJkG44mJyChGUXSLIQ_qnXDO3x9n7Zd6t7-31W8SrR_u3ibx_oKKSVA2oCaVB3nRf4BjIKsAMDeOWlNChE-2qbqL2Z3FRcQG8jPxfo0iljUyrkmkD3upZWexT_2d-1N4HSfhurkp0ja_1HKDirbQF9V1HkeNRilgqFGrtiwoc5aXB71zEj8hNSXEwsogHqwnJaCVytM8w16rR9JMiigx7rZCcio8meWYFUvzdlETBKXCa4TWrtD7JNEBPe55ohTvUEChwccnQDeeeyioudbMdGg6h8J2ofM1TFh7OvRtVLGzhJtZMGi5o0uaonnSYKFSSOMnwfopycS4fgi-YT8jS91_Us5wWxvOV6aCEGnHXB2sFDXS2arV2Hxm76JDCybgFpQMRxLiwVKRTv-8GFwJdcCyl9NdCzHaAA8yQuyU0DkVucV30yCrwMgeBaAEgxslm8FzvoXF-n4lgaXAEsv29WnYxoPr6tQgtZxfFZPOAMnIj_h-eSZB0qqMt_ZEEFC0FmCRWMXi8m0s2V8GVEYgFyFk46T-i76o3S-IUJl4I5QXrxjkwHSPGTE0sdktcjeVtyLf66JcLj9MpduacWn17zjrHVPiQttjLwfw8_sOSM16GkMVmc89asBDhl-i-JF4PD_oV2CpGk86CnAcr7DGRSxOCi2kSETj3BLe9vDr8cAQ=w710-h946-no',
  'https://lh3.googleusercontent.com/DBPPUpJSecT3WlghXZKVSY816pY0Ncgl0vNqD7J6TIlsQiT42rsUeRMMSxLaiQ70S-yNzeuS72QMvvdjrMkaiQKarvgk-AJBiZCq_PLmN8BoYGa3im6rE1XS025lUPhm_oME93ND3NfULOsIanNz7-HIrSEBy-5FUBRPwT-zEiSnIZVmkUUENkmeSBR8-LMHFFm64Y2mZguZTW0i0LUWH7vTejuF-p1YBprCDgf5rOAyoY87smglU0o3OZ3NtewaVzI4yLksocmNBgdsEXCtyc7_NBnfEzkz91QIqprb7UYv0elrX-l79vT_2t1Qc7VDg22fAqhdlEeJT32vt5dbzZ0ajvHELEjR6Fw1x2ok7kC8zqRCxTnV3UJ7zona-Fn9zzaD0Oy-GsmMABfJKq8UMEs9j7ex28oMiY-ru5Zp8AE7Nct_M86EG5u7AC3AJqNvBETcCeAnCltnOUFofow1blQyUPlRvN8YGEL18NJXzz8vdUtc0srcvCeuvkoX7q-KUsDcjgUn4d1ebMQJeEag4pyryDTL7l4NJ9y--2ta9oDvhastzRaX8u5J6SJbZGbxwxZW6fjnAsk0cJDZNR9LuAFSvmioE99kczROGK047Wlmp6krDl7_pG3tet3AfQi2eqWlW5dLcsMgfp_bxZP4TMwCRSUudE-SbGeNhXcMX7bRO6H7dL4lZmDAF2MWqw=w968-h726-no',
  'https://lh3.googleusercontent.com/uz6XKutI00J1y1sxFS9ZQCgjJ7ZaQykBelBL2pus2h6iSw9-WbNEsd2s9Tpas3S90r_hEP0a1gmvndWxR7zqcD1XMqJC6M8t1wOwLinZ8_Td9PlqorGsOTm_ebWiX5Y0sN-ajqWN0OohkXIEf3I9PGfMGDayIFyMGFngI3EcpZq9nbcmYygI3rsPHQwq36ze3mU6aRDFITsv5sCl7Yo2wDxGRLtar7zmJ9jaBgXJGgP59DTdj6L80K1dYqs06dqbU6ZuGOwOWlhV4_EjxyHQD0NCtG2IX9QMzgTvfHk14xR9Eyt90On1xRCibre-Xocynsi8_082w6YRp6c0kZZHnfLuC21EYL4VdviqXUAzLjCeINX1nVgAgcLGvg4wZEu6jmfrKawmnbhOqsyLAqZGDB-s_dzY6VRSONnWDx5IwpIq6ye5X2tT3i8RQ9sbBHWOVYJnlRXVcCpK9g1_Nq-RZMMa8rh1F_pZCMbfPVae8hwK2i9yCQnQfg4QxZQqnJs24mGW_IOuWXjZnca28y4V9cuzrZJSTASxJNDyRpDAoPaXzxUGynGNkXA560CsAo-9qdKDSf75Abv18pCwywaULyq3SnDavlvzScwEIQWvETP-h13E6-kdMpPez3b2P3d8NvOTYfX3uMADnbfOUaxRAnjxauZu334Oc_hdL2ShmhKE8PZVsVFmGJVPCjJqVg=w631-h946-no',
  'https://lh3.googleusercontent.com/r5Pn9JBEg4vytKk5QHLN1MgvLPBI3OHR_saFAL4bQqjsKabmbbjEujc2A_yOTRpPMeGyXxY1xFzLZoFM8KFM61H7S1N514hE0myL4osChPmJgTZ226Jopygx5ygs9SsDJi8_YDcaOBwr6HfMnP3GXdmTd1a28xENSN-D7SO9Ntx-_7gL5ZghNP9ZQwMDHJdCUBk2lUT2ohHCMkeOVCl97dMz6Ogxk_XozgMKrYfTEuzYw9BFQLZpu0xmloAXKQIds3_qMkpR9s2NJoWQYOxtoH8NLN3zRdybRzuK_Z5bKzDv9mh48VLH0asj1sEDU45Lo9ZqFK1ZQn4RwbhNN7jiSJR-koQOzSLTSqsZwnljqjJJlDmHHvX3k00WIKw4J6TQx6j5MTI78V2WO7yUyx_o7npB-4ITjSUpaZvlyyZMlh9g2yFZczetYzAmzJedw6zp1EwD8AxrxRPwRTM4HMz1t_TMRnKtdBc1fLnXspFaYjoGi664Uzcfq5djXVBkN-WAbefshTYWungsbcaUfMjvV-w40g7rRYyiSxC145_oiglztgjmWuLhpzUcfgimOJbllMgGjLxgNJPEdAFmiFJ1tC3wKxVTApXOxTd256643kot4apk1EdaLvvk5FUbzxvx9Jre2D9d4rEP8af8b8XCXdHZeX-JlkeAVXsLBk9FxmDKyQNRGylQuxo7noJbag=w624-h946-no',
  'https://lh3.googleusercontent.com/M6HOiTXuWtXLf4NnnZZQYkgXDK1YfkY1q8j1prhA2bR9xux0f6V7nOudp-tGJdtGgZVG2A7G75ygq47vl9L-rzgPvQIAGWlsnZM7FN3m0ilUyTRCTBZBxlpEK2iI9i0KDYs2K2NozQZMD1GA1-9Q7cNPEMU4pARVpyGVV8u1rFYxYxAM3XmkPNVCf0rqXCgviZLtRZ-YfGNkJlLhgLFIyusv6YUxkkOYtad943Nb64urReKhMyeptJnJDo9HYE2-_HCUk7rZI4XxKz7rRQErEP6TL2kPEhXoYM-NPlR4numDSF8rrgjB4aTNvf6kKm2vyUypBV0exQNpYWSFRKzr9vdddr-hiNA4UdBo3aQZORhbQ-rSYOdisI94wXbU8eTQY9MK6hqBpQiogx7utSBjUROynxih5sQstEoBvndNbsWs9764pop5KkPWe49ucSvWYK83WwDZRkgy8KPOJLCBzj9QS6-OjxF03TZ8p7dVyfGjndTc5FTAFcfwL_6DhBMWtOCzi5JLB6acThTAbAszsltkdIkk3NL2tfH_fl3ph2oAHSPm3r2AAbsBTp_LRdAsI-1mjc-taNzDo9JkSJ0XY_wFHHUo-wVkfZ5Pq_YrG1NHNIKzLUkQGb3zpayjlGZ0gHBj0uUhKG-J9OIS7mWF3lHE4OIOlExaqWu2HzSk1QpKrQdxXnTS8en9puq15A=w631-h946-no',
  'https://lh3.googleusercontent.com/VJdaSUAlGpYE3E-nMMmMzRKm1YbCirF3f05iWXHpjoIwWDBDQZVFpLg3bHrfHFKGt5dXXhfsACd6z5T_M1rW3L3mbwuj6Ttru9Zh01w_utIOLHyI7GBF0dunCtI4C4U2j7YskEoWhvLydA61M-nGOTuLi843rrKwF8Kdo94g9bwOo1ZaKJLbcQALfEphp-KdBSZCBYo0QTvwIi2TvUY87ru4CDnKP3iWNJVAN3hr4ZX8-pmHaRb_7kG2_246OWpkzPB03XnHjSHXApuh2qTARI-p6jQQ1THiBgVTFAIzW23-VXWT_r_qFSxzVVq-y726fCULRQ3gipgvPENvsRkHVne-WskX4uNPjob4lm23vOI5ikkJ38-cbLR90odb0_qZiyysRXW1-IgqLBlEN5ssUJ0cANEAY04kvL6CJMXkPv-lp0Xp--M1wJ2PzPnC3cLmcy1p7YZjthhfBGGNbrdIsrAF1XNdnLYEE92uhWt3eB-tMmFnbZTv-LyMHFWbtClAkhQ-tCEhEcFAEjSxuLY90YN4XR9l-7OlGHtRrZUzhkVbkIF-T-bD45ubsF4wJLhqJsozJ2mhaM8qf2qsYyAHzLPkVb6pzJlAobz1YYuOjUP60rPX0TEwbR53Fis9ssWdwJNymEOkUWxrBL9JeWbHikPT99dOIN5s6p8cDRyd745oKeVjCtQpgnUwoOkPsA=w677-h946-no',
  'https://lh3.googleusercontent.com/p1mrTVW7pWD3vH4caSLmw5AW8QYsU64_fO3m5dpLiLKOFAc5lVNpQrCGrypmAmDJAb4BbAxohocEG60YYqZG_DiKn67B3VKzO2afILoM8DeAkGd9Elim6O3N_kccyWgL_0szdP6oH2zGN3U_4IiVTkYPK_QvGaIsLfdoG6G7CNpHKj4JGNLZY4k2N-5lK-xqdFnUJXqnFk5LTBi5ybM6f3HAHV7utSSVAEqNDhbIU-_5wKZ1rT6iLjAHN00XvIRm41MoCtTPkrNNqg0T0PuDbX26pxAVDSrhj2-1H7usgZy8Zqdz5maFQwOb5py2vHtkOhZEuQvBb5bk7yg9kmC4KjoraSBm5MFmgCUjTAxNYeZPQ3YLnmuHUxE0Fo-qrjt2yYZgWKWL6RwNdOlGRava-OOMOT76aZQtjLVyaNOagceLQox9D39lUWT_IA7ABuEl5VjTf9rq7eeLWx5q2NANU0obHqt4b2J0M0nyrSO7wmagLvTLUaUwb4-LDM8ZyhyJP06OUHLTVDPjFezt-2S66cmPTl56UJYdCOKq8g79jWfvRPZFO9vIpeItliiMT3x-bVtVROC6Vu4SUy_fJEpXKopEhCb_ZdW-Odi8p-mRoQhaKhfF3J4rOkCzjWgKgyLZ6GAB-xEdEudmTkZQj67bMdMF7_8duHOp6HcwohvExn8oveeKzlsD88vYyChv2g=w757-h946-no',
  'https://lh3.googleusercontent.com/trzFtwh7s41oA4ydvsMpcCd0I1jkQk2MfrQn_i9LxYcxP0ATs_j7MeKy7gikDjz1H0CnmxqWpUznC4IbidA2ujklBRLhIFdo2cR9j5dt4eXwvDMae88MxDQbca9vyuIW_BmcAe0XB0fdULQtEkQ2cvE1XY_NHa5EFLHK2eegPJZKeRoL0Rg-Yk3P51x54N8SUxAoeWyDIfF7BXFwDVDA39NFRTtxPnShR_wyMYWniziMwmvDa8BYnzLZGTOHim8e3cXUYRJphP2L1gdIsatE4DCSzp1Mjz6lisVo9Il9zjAC8es0DGP4LoNiJqvwx88E6wEpGDdtucTcYSItSsEOAfhVEguAdl3_JFrz3rvlPEYsXCubDEtuqTzRo7trSYeASEa26tJaSRm-IX_ZAKCqHfNLHkaaW-d3Cc8KDwW52CoPRyhmT2FAN84ik2143aomyv--BneJUXvq7i0cCnaXyLujPnGCByCUCDLGYCGvGv5LdaOo3m-ojxCccRyChoWkjnVgB-qugSwGpydNClwZBqDCGjW0Nc_55VYF8z2cuXeI0nWlTGXriQ8Oz7XeeUlvONsxWXc0UZ6oqxu3aAU1OMCU6XnF8XnBnw_AzFK7AbJsolo9MsKMKC28t3CRhCUgHm6OllWdcoE5pnPZRVgLS25r_enfbvcudlzX0NiJwfVQvZ6dmuBRn2iy6NfrEw=w968-h646-no',
  'https://lh3.googleusercontent.com/TWdAjXTWuWaOH4zWYF7VDX-1J61cMHDREfL7l-PLs8slOrAm88DDC2-JvBRoVKJOPLUdtARzkpjmK5H2-aefu2Z206zDcIcv2hY191CwaRFQotmaT1bXZotAlUv0Wi4pFzgGzHcodhwvlNC1v9oeNu41NQyhnEOjW9olV5hvzjFMONpNh1M1qV4PAd32u5EtFWBve3MvbCGfW7k63H9V_L_wgtMEUGB2ZpHPh2Gq2muoNZ7ihvqrul-_rC_RxfZ-O6LqqbUSwmjp4VIRd6KCLrNi2qNmGy-1QOePqXmqihaFx5RxviWZJgda4mQe9TJ3-Gy-qIXChb1oIjYlTqs1T8k9OmVpve1UtiD21YPIEgBjygWkTqfosmc9TEM0SQDFzEpn2RMiEOT0rS4Wo7EVxtWxzmVmg4O3nm1mTEmPJXnL_Z4Q0p09nFKP49ZXS0fVaOqtmuS-zqQ3Z2bRT_Hnpdhml4MzaxMoYDIpaKcKqKCNz-ZQfyNNnKycBEfN-7dbKz3M3P5wqd5piqHIoKsyfl6HQr7X1WsSE9tX30aiB6FZj3iNrO8Zw_DjP33OLnm9KaUFmydG0E5_ziDBLMNhzwOD9B_Y39VCrH5O6cdJlOxf32ukTHjKVo1OXkJe22dtmgYwNv4csfVj03HXghfEzRS7AEBVeymRT6LWn0Isxw1ZGQ6NZ2lp6s2TWoBCMQ=w696-h946-no',
  'https://lh3.googleusercontent.com/Y0oi_QOw-NsthghEiIA1wPVjqwbyfIcDgn-Cc_J6T7xcjZoKk6cVXQumlUOedq_0cwdvqYvl8pY2bo9wGNhKDo68TgPxUysYy-XIIJkqBuz6KK-4avRDbFVKh9vMVBVYAOJFU2f8o4LVmkONCyZRZkLlK9fcJ9IRQU_9-djDCm096t337FLGSb9qhIuZYb2nFOUyU2wIdOI94kQCSZuh8rhMRhTbK3daTpIPxTZxKvuv3LAab_3PYAZsqU9c5JWKjGOqTkQnDq_lZAMvUr4mkDc5SqztMdUSL1amxHv4O2Ipz-XPqH_I8Ibmz_VnaURRaq6loPDqaYkMKFDyrRdk4w4YYbe-g1qWPpSaVC04xMl140HWH-QDIi1-S9S98SDP6hy09_IKg49KYKqA8oEEcg-nVwbHo61naacHzMByw7wJWpk6YvLjNKnOpqPqn5B8MzdgmEaixwXnZc2iS5dS59paGc1sch58kEoR3-gOQe3UrzQdnQU-Q0XgrceUx3TEMpJ8S-EJCZuzMbDCoFUSh_Qzja3PCiuYGwYiE2kLWxkahxKw8xZ63gRJ3sr9HMcWZD5olSfARuI9Z3d5yYHqTtg_-ofv4moy3vkRIBJurv9vdmNKoNUupY5VuJdl0t981L8rVQ5pEWSnHPUrktLx_1AtakECUdJicw1cHitodEAIhaDlitfsj7hhPs7GvQ=w968-h646-no',
  'https://lh3.googleusercontent.com/KmCF339va7ZFlIg-sUXaQo6avbOj_QTNy7pi2EBO8tUzTnQyH5ZdH4jE0jOw1FuJossAk9eS2TkV5hrE3XTclrofqa4dVzT2_BxFqW36l9s80Gs2PJIAw7ffH4fGN-nlhbUKpxU-gq2scbSm2VrdMKZ2d6FN6KGPlX7ErtA1t2xotBhcEAupdElvabddPa5i_np2noTKU2iffZ1qRq_k2BQt90CJDzdV0wJlOd7ZZh0FH_XTzn9Mq5nw66Q9iSCufQ_i4XTEzDc3fZ0XUjkODuimdmBN6NmnBHYankVkAk7bNn182O5mzDlFG-duO5fOcoeUA5sSPF3MS2WFXNJ12aq5_TXW6hElKWCN1NuM-g5mZzf8ZWzsSBpgScdzRZx7vynYQ3xm3HIW0q8okdk_Assew57CEqpziFMM5ZDst7B4tI6TqEt3dVG6pQbO6K9UmIt33nh4MxQY1mDZuhukkBCMSG2zBzmCi_KKrxf7p0NrRIBzmuVgM8VqB_pRExuoC3--C6DE6YCe1Sm0_NQzeDuXmaCwmjxMWWc4v_rhro6H_zlHXtVLS2tdnLtBlGVt3U2qm8ez1-Er66TH70N1ECmWpVYIhavA-5hL1WwSmqtx3vQDUolVEUFoi-3okN6XMG5r2KcwOUvZKrAy0cAB4lZAh3cTXSPNk93ULyD7Z16ogdIKmROrvWmCG-b39A=w757-h946-no',
  'https://lh3.googleusercontent.com/6CnzgeOMr-DJjUeOuMgPaU8Tk9Q-OKYkfa8Om-eO4KqRaaeiHWDSREzye5Ki-E80RQ1SwWnjaFi0PhGCK6c2y8L3MdnUl817_XeBH6ih34uezMf0_w7r1Jx22heuvik4nEK46QiQoy-ZsRql4UUu566P-MSSl46MCUSqh-LOTXOPgkHuhJyUbG8OodTcO_Fv0XhiaTbH_thfzFd_bxSAKTofPOj0zZmqXAvYQUFPicy91iwNoemE0QSNAMq4__c4sKTFGs4-79WZgXne4E39orWhnvVT0KRqsAS9rLoJDYyjSKgwHCNWRMXRrWgzn-WSwThkEL1e1cbycYniljzd8S8mLxWMvNJZR_3mrC1Eo2NvgQJEhup3ptstWIe9NLb1h_54_-1CHM45XtS9jW6CfTn18TjeV8gkzzH51y2_2oPBtw-knVQMtfH-hrQQbvbcUTwb02rsvYs1glGbvOKcPLiPMai0pkRn7-VJxPtLkkmH8BLogA1I6-YPoY-YsVOf2qOYunKzXK9QBoQsiWihaXj5opFnA7ZStwdfZnsiAinZMtPNXrROiIuSzY1jYCUxjR-lQF-RfFc9yGQIckKkoEI79ca_lzkEVz6Ah2ScDZLjnLvC0sxSop_-C5Y9ZbB_1csAglwGcsVBKOHEdxhsRg455xRHz5gywKiweolM8n0dF_yZI4kNiH4p2VMH-g=w710-h946-no',
  'https://lh3.googleusercontent.com/vGKzUm2LS96f430ONzzF_Tomu8zDxG65gs0ERIBBqTlZj7NAgJNZBnEwFQ59qRNxtIOZvwRfwI3owYFtJRe-dU8NGReeBoqIulaEL2_qDg9MV3pbnb2-5sGqnHOnxnpli3227_x75_imRyPeCBkZ6n5duLn4QRdRLboli7bVuNpbz6UZh5l-HXaap5v0C0VJWB1jk188P8m_O6qhFvqi8zajhlxzPzI5cygDhjtR4eGvURkFkkz5TrifEgm3W1niOc7Ud1-AAnjFmt1cWIMBlm2gG5zE08sAZm0IIDNqUFxSKrNA4PQuBnOJqeMWq5ot07C-mq4fzEYm7Am9IKHC_y27jdvg8LA4B9_YTt4AKolv_iPNh_uhv0fKag97AZ-7mPjVCv5ozD0s2AlQn9wV8XocSEt7Ac5BfCNaLapRJ4oQ3Rbk0UxpVdknhZDi7ovW2JGPzAGXxekJJDsR9pazz3r8UBwKQ2iae5pMBnK-tL-vH0mXJXXMGWwHTyAATIQT8vrNWTm3ih31A48Vioay0BVBHpEATDjuHcpBWtGOmgrGDW-EYgzyRN6HeCEB3lWpC7-sXRs_dXso6LjS6Vad8YLp2bGHwMlJhW0FgcyWVojShuK7InjrLA9JUzpejysV7TDST2l0NLt43iLRoKPus86xhg_izRY9uzAInINzIznnC4nNA8rn5XpOXHEw7A=w968-h646-no',
  'https://lh3.googleusercontent.com/Q8Tx1i1iu_fI0JajYA9ZGdfPLDQ84x-9xqGUApG2KlWURJB_qnwQvo7oVakKUPElaucWJHquK858xFBhRirSilOKu0xK9mikmGRk4S7KJCunFstt7xQ3-Hg-kxkWGKlxEnG3rw7-2d9u-Y_dQn67RThWktqz4HC9cYxaEnzvBWdDkO4geLPpx6mzlTG4K1w81VjrYSq1CDZ4WjkNlGsL7IxJQkd9mm4NEwPh7dBQSDSF6RIKaRmIjJR02h_SQvGgd1kURq55dkLlENgtOpg6xg0scJ5ct1dIe8d-5odyffKBQNs7pDmmzd-YrAsDniJiuinxxNKIYEymP_-utqSXfaYaoUWSEpi644cdOVf9OVjrCjfkxwMPgoX17-6CtPqdPM9Y1A2DuV_t1z4sDxQM17-suoT473w_h_yd9i8ybHt3M6YDEW1lsB9eSlO1750o8KFtMvijFCJOYPEj5lVZvC_-sYkqVknC0qU88wAsZHiPW2yLom7ImTXC-8o7Qnw0auFv-ngPwBVyfoQaCDj4puykRRDieJPLPKAb-F8T5zJ4Vlvq5e2CXWCL0RaFl-GTRB5h3yXsDq-Xzqm_eidqfg0Zih9Nmz3Gi678frIAvrD9DVUnYrdvIz-ndSh5qC6ix6gXyboCASR3iw5JisZer6SY845DtwFXDPGSwxoNTHZyIpTj7dfU9gKOUuHVcQ=w968-h755-no',
  'https://lh3.googleusercontent.com/We2g_hCizy-vD1-9haJ8nkks4zO6D4ZeTnDGSl3DB7V6Uf-cBld6KCA4_Sk_PVB60PPmhrUxMCMbMU_kujVE5btPwK8D5CbJTgKtCZB3ZOwVAzfEhE2t9oho3TKgASMC9AxVsxtYKjhl5Gp9uStgioBR2UuCaG5rJOVYvXn-bMRS3OHiAKt4YCLNpFnIVqo-DTL_v321T5n5hUi3hLe1gLmJXePD91DoZ67-wLBKiBBkuMvwyF0pp1tABNzAgC4nClcKTXQlO33bizhHfOtPpYOflqQre2NcCOpS1QigspMGF8sSmgzb6DbEfqPXPSL5Bkgqm4kuChFgKtu90MHU7zlGuh_P1kuNVMR2MKGKjhXHtFnMyv1Kv8T8euaHaqSI1UmO0GdvzUCU-JteFq4KZeRmLOajzNYi-t07zvzpjd5-wnGwlQByaneXltyKJBSwppKUE2BMmkHf6b1zZb4VDhO5ki0gfssvH2OFYWaPP1w96qmnG44ONFGg_fFUNzKHqB7hgAhsHlNCNY87o5IKXC6UP-79UWCZeYmQQ90JMP8-UWUUI87zCpmQQmHV1anpdKKlF3ync53L5C2-LcJWc-KQeetsg3WniJh5aBJyeHF9WZ01ZPtJ49NAT757Ldj5gBkeI3zeIiAwIYQpuyVvzaj-XLATIIUEOqOGU0FNpGYrWGNR4E-LtSbAsIx2FA=w631-h946-no',
  'https://lh3.googleusercontent.com/NRjk90fVHyWngbV8xVdhZm-HkpxyVQyMUMeE1pxJ6R0j0P4oLNgATEAYe7gn5tiM7yQr-rn397fd4j90CGqdrm88s4c8r8cl41er8iWJfEyWYd1lFfLsY407jJ5OkzCrIFhqpYsIS1rY2JTLG6TMLALBgNtpM4K3pC8gbHgSWHO_1ekhQe0F9RfPWhga-o7gGfKkWbTxXH3DJWtE0X6K-L-tf0-0YgLIdIa8U1m3u5OGWuFa_LAuOVakljkHFm4QEo0Dm4tQ-cnakPdur6l332CG-2RwElVtrvjXEzfkYDEVpck-KjraM2fTnlxDIPntVvuHyc7rIQGW0NbC41fgdkdyLAqArGA7FjNpMhwcFLBDWPzTD01YZYHLSZD8tOjvxACBtBseaLCMJtaTTDSvVqrT2YP0wPBtfL6DHyG7fT5PbTwBOLmSbYzMUZVkuY8S5ovJuIKdB0gaHXdKQMYYgUdT0fxV_3Qsi4WsPNrbMCJlCEQjJGTEa92LcVkcOPG7W3JZqkuqFuAgh4doI4qcAbbVMFcVTPmcBYJxTbP1O0ohwjcWKBnjQO512vvCepwFdLdhFnTWAoL-yLgFKgFwqJ1n1p5o-61J-MPeMoIcXSf8h_zF_Uc_HBDu_xPJAotOyRxW8ko-vhgRNnViQH_yIgPCz9PPFWdp789nelPlcIGsFQNOBW0S5a0eqp8qjg=w968-h738-no',
  'https://lh3.googleusercontent.com/75NQzKV5qwFT2zIAB00hCNa7Emi8YxTvWqD9TsoyMjwgoz7oF87URd9TB3pFYaO3DaQRxChNRcfucvQ0rFj-gqZDjF8j4DWEiRIF32d5sKBMAY3syXiKcezEceM-737MFayt9W65Vc243weCt9IjRzyxTBQ6AchgMabrIIZosNKh-5jWwdGzihvm41MG0YrVxVSe4bRodlgZWoubJFlWs0e-gcn8O3Yc8acAb_HatBiEZTsKg_fYVlpfCo2OVvdUN-FIneCZea6gGJqj30kzCigBhhFWDsEkdOmsNdiPDbQrMApvsPbVK89ahWUcJ34s9BjGbFC3E657LOqat5GjacF51KVQtg0Up6Lncq50aKXnAfNz6uXHUzHF7r77DW621OgXe_LUA19WhwDBYPnS9uwKbOqkctYL1gVPpeHCC3JUDGY3ncTdYHjXcZy77VWi0FF-SaRDxF_8YM7H07sHkPHwTbQ64eEBa20zVUSGyTkXt2uPuLzxx8WpyY79GuX6ezkR_SqamMp5lMH-SwJE0bf5CJ1VXFJ0c_oEUv18HFoi4tSgkrFau95KmewWq5hHtdhemgsi5zO8ldFCRVBmT-7biVnlu4b8UEbo_E9uvNV8ORboOZa4zYvTYT1dswj_OrmDSy0hcrWdS5L9YY-nBWuJ61VJ6qf-5i7kSlPngRyxdD2a0LaH2qyyPDzavQ=w631-h946-no',
  'https://lh3.googleusercontent.com/xGzY-AWdAD4IedgnBXXM9Oo1pNXzz7dod6w7JLt8c34qChKjlWheW-8Tzgkyv2VYvtsSLxt3KfqEPCpv9m4Ea-BJZgbgJr1I8P_XL_4mI9jn9SvxqvtfnG2EBTs4NRsgPh-CMvEvNkkHHGIz4gvtSYCRMhzdfjguMBGBRdFseyXKb3Q4GFjFqcdtON33vOXuQ_tcMYksLJvAd1zvHiqOuz4sklJIXFzk5QwRrOEwQCT83xicm7QyBXt3vJRkX0NrJm_W4iUy03eLCjzch-wK3SOTveQgeb5u45PPU5mKh1soEpB1raBrR50vQlZukmWMz3sRspYsD2ra7pt6bSwsJ4cSEXMGkllZg_KD_b_KMwXWf7b3rR44CbdbwxF3Er9zy_xHRSzuz-dGSH_cKujvK5H0bjIxKzpQQqhdnvHKyVGEYDsL4k3hetUTOrRXzbmBo6_lOYVUC_VMCuMF-12qm3nfhC77ne1FTg0JiPV1cngIuFcCu7yBVeXefVJ7YVGqWxW66y8VJ0oksvnPrRuRIx2LmZCG3TwX5VEINlx5f0m4vFv1tqGHII0E61F-9wX0EnlRbB-ImD8icfZLgvBaiLvBAW7Ix4smd4Unv73MxzR4nZ3B3FXuFCzZareDBFfVlWcrcMDMEM2BmddetLw6YqwKcM-rhf-AKHLehLmfT4mHN0vd3Ii7zBOxa9wVFg=w631-h946-no',
  'https://lh3.googleusercontent.com/6lImcXi-cmFO_Ye4i8l2kMcT3kwjU5XTNnbbKD3VotUCx_GMfclm3eRmjaN70YdorMXlRwM2ZlIohTcT3JuRt765YCjNOMYUvHTFF1jGoEhdjc7McfpBx3Fl927SHiPdfVosI9NNhA2PG7c086jkleJyJ3E9ZoYwlOQJXaj326-kUBnuMC0ZjWmnok0JazSe35um8uzzkSHcmoBIXlMlJySD7rlpZZjjHpNrxDb7TFO9zy52fnRnAqbd-mq2xps3aa1ypcaMIA5XsLrxVUCABEQcFDnIAk_O_hNbZVkcLj7akD_rKVhj1UYu5-qt81_Do-WuAiM7pjBi2mkeBN8NMy7pygKnCg4-nNphop8V8sTnez9YEebI3FRlgko_DcDwLK0tKNtMu0v0yPhB69M-ntfNNPpwiYTmn09ITPJzrH8PLTYH8aAgST9jsJHTKC8a0Wlvx6GIYQCiBYEkZKeEmra0USNROLS8DrcF_xskGOmrh3EwAC3JkwTxDSAMDGqOyR-wTJiY2hX6GY2lUrpwqHVyu1guPC0ey_qWQHWqpuiDd13vV2XCPZQRBaCeANzup2HZZPS-gd870pRByI1nqbpCMCgHVBaJOBYGHl6mYu8AgAujTHmn7XLulUdbA5WK4xrDVxwu_iz8O085jPbDyS0jf8QErbXv1x3-RzeqYIBqIwAjVERd5J7yVe5zgw=w680-h924-no',
  'https://lh3.googleusercontent.com/ipYYpQLe8YphFhS5gnFe0UNK85OtUmT4C6rdGWWjC8M9vv4rrJX4QiJV-2DtXMVe20ZeaRve5tsvAyAjO1bQZIc42iKBnJxOetrWcDzmuAntOJZ5JTw8v79KlhEZP9qgYijuhyfUFks4sFv80gumgQOy9sLz5JgLtwjktex7m2-T2CksQe5QGRcCSD90xhMXbMBzlasC6NIkNbh7CRc2HjDiq2j0K1a4j5ZGX2hIfirnngfatPh1EhSCXmLyK-XExE50j-swZf_t-ytIFTeqqP58MBEekszTbO9faq9kP-CTr-ojgRvLYFuq_dNqH9cMtZmToZvOv13q0BfbbcfatJfEpxm_KIWdWYcFHe8VKINsa_hd6jB3aocphg5jxCSgW3p11GbInhFfWhaFw0aErOgnaEqNUEGebymQGK3hMZYa_KgQCEvTWh-iYgWzfTpbhBy__nvn13ii1jAWMxfHw2X8bjNrmtgdnOMayyokCL-a3igAloe-XqWrvbuQoi7d4mcKa9BLOG25oe_wJgkjXBzD-X5U39EwxjhkYhvn3xAIa4WCeM9qlQ0Mith1i_PwQCPM0ZqngVWW8eETVv974ST0hHK-vAj-FfpXvKyuvmq0OV0F8nupHva1VLNp1DuxMgWfUIzPBwtsatKgQHxGYXZ1_-emxHwV8uvSzhgCimuY9BFisi2ijRpIsMUD4Q=w968-h646-no',
  'https://lh3.googleusercontent.com/ydSWn0w_yrqQ8GyzcWNCeT2wxKtV1iab7PTATm69g7g6q0vtLbwgVfKVwHy-MHP75cfU_Zz2PZn3aUmXr9B97wj_UEW84X9VkycarPqsO1XXZVL8qUYQ_plwj0O6io7n6hheW0xlzwaygqiDwQ1qQ0Vb0Ht-7IoEPN3A94vY8iWVZUQH2GlMKHjfCFs28gjy4IGebkqYjSnmK7F19xBi0f6f6y0cZ4cxSLcqmUQ8_-W0yB2BXRnr2P9LgMJ0uLBRdCobScCjg-8XDxsnEtWuFy2UwTWXHqis4jS-TRM74sOQEJ55_1BmV_s1c4CjH8sqVvyZShjWb7VzewyNulETxivdsOETs7ogrf6q7krUqwV8Whp9nFYV0n1kIJwyMSw2KQXyxifRpkd_yj-0IF4GTFXu9OkI08GK04PYdKQ1JrqLd7yanWHBEK3Mz3r-JDFepi3Y3B9hxzAYttUzMIhXRzyx3pV5Y-PhNXLzMjhaM46vv1bPQnLlOlMjEt5HeFLYYxyTu7qFTQqkydrov2GdSjSnrLkTMnFT-hxEA2EotfxYVwajd4z6SXYUKvnp-jCqBwcfqQpIIReNJfoTVc4Ij5-bnJud6SIsFQwOOhs1JdjGuWSPbXYXcFmDh9h0x5KSXn6rJZUvefPE7arXwY9TDS_Hn6TiDZ6CYBQypJsuC4mE6_DxS57wuHa3KNOMuw=w968-h616-no',
  'https://lh3.googleusercontent.com/2-Dew-h-H_dpjf9QTwNBWX-bbW_eZg0T5XJx8grI21ZXeMpd2uYKZx6sTyJtMqXkOp24CPXKn5hHKuHwNISE_5WNOIelw51yM9-H1pL3aiRtQi-hvFlTX5dZFV6cFKptnD51StlteBt_R-n67N3gCmiTw-lEVM5Luj-jHrLkHp4fOuSo-ya4FZsgatrUYKz_gtKoWDHsJ6_1BRYrBMUkTjn8jyMcu26Pc3mkb-pMVl-hIIeFq6hiL9zoVsCpJFnfi9KZs46wqCFog3fmyVLZrcmeYSv7WSgLuFiZNDvkIgj6v1mdFo9W2XZASxGaThQGQHZbqCj935BasbUwV9i6uHvs6CFioyyjE1gLWbhItmDR9w5pXYUWorJfksmojSwqFB0Ou0rAZDURJyoHDJX2fKHvzR6PbjFOSvwwuqrOAXVZ7QYjqHB6MM-TI8-YR2Rpp3zMye5Rtj_ack21-uA5CZkGcBjC2uw9PgVB0ay0zGWWQ85nKnkc4Ya8HghWUJvl4U1cudyFVSfAuFijqxSQHqHgoBwOSqrKtgCo9lRUyPqAeJjpsItLMegtuO0ANbTlmGb_PKYDBgBU25Zfm4KRFvGZ1cgGyGIOUjDHYf6xDFulW84oM7RF9nr9fb1StSlRnKLsmw0fe3mHmHWPM76pXmSGQcp1YpMw_g-0_d39ntqf5gewgOGNMfJJJQN11Q=w968-h646-no',
  'https://lh3.googleusercontent.com/vK6cQkHyoKvggWgVFpa8b01F8Ps6aIkfjVm-07EDfMIeeNiuh863pJT8Egmn7fHO05zlxXBSCkXQxnn2AYjxpFCEiG40Uf5iKmPRZp0crGPvQC-x0RUzI2KsCq8MnBWrvsuLQrLb_2DeAnJB9sdNZBMQMRBZ3h3dEvzIkfIV25nVHZVGtEI7OSc8EQxHgBTvh84M-lpd0DODbX3ylYPjS01mQhHnVmwdgmaLySq3qOP-N9MrN_8xevtP87G2c7RJNn2PVldWoFVl1lXSzC-chB7Jx95IyBRPyejdp7S5UFtB0axdNBg-uZmwFPYepnSZXNnDeZkA968NiMTy0qfSur0uY4MYvOVXCYLYTOwoF9zHPyvZSjLvM0nAK7W3M9T9bTAWjRd-grKopybtdu0VXy8g0V5TMnwcYNWU_1RjRChvEDXSxnbhlyiqj4HcOiHBTXmqBoAuImlSR-n5Fbo6Fnv3KKCKiSWexODCBuCT2OKA-hTSLYBBwQJMIx6sH_AWwgOY9UzYQHcZVeizwkNf_VGnLIVjpwanA-mmpRBldu4QXBYWNKO_1skNyxPwQ5FAbC96zFy_USPmFkJDAdajjTw8pY8veRL7nIqXdTJdBBm8jTpequyucqYq8GZ8DPbU5mulDZ8KkntvDt06GlZwRZgPk1LcrmtsKn8-u5-0nJFsw7E7mVJp3lkxdwWGYQ=w968-h647-no',
  'https://lh3.googleusercontent.com/EBOV57mpAEs8u10Pb5lAGY3PWplUqj8NJMupHyzI_HVAJVmrQgCvQmGH55enlqzbxyOa2Ig_tnqCq3kULNBWl4BhMR1I3Y1oTzMiUlni3QQXn7FYGPMl8ufbAJBIkLgjg_jky4wiexUkoQQmGck32vvRNUymamqYqbRNG2m-3q1FU8eyJiWc3AF4Lca6HDILrdSHg2HrtLs3qRWchtX4rJhZRu0GWqrJG62KjpYSKVxVnwJMhm0-QFkRf_fR0oZvgiXFzfNGnJ2A6C_NQi1Of_d8-1303Z-lJFX97wMtJvA60J6ZUtF4JD6-aKPi-lu9yiwgsQLPSpiuS-kWz39b01_h6tlgYMT5EQiWPBQ8-v-dCjxcfi-jm7bi3gk7z1Oa6neZmpXZY_lgMvBFEBJdpjCGACA5kPi11UKjuIlyD_U7r-n0tc8gMalwd9iSRB3JuD_H6UDhWZffRJs5rEje_eVYVSex1dQhDC3YEQzH-jQ0wxxzKF3SGxvi89qub-78NGwMA1rBDmsvS7rVzzXoZ65Lgliy_DQxZKpZDDOjXYnGpF8nX8rNpAYHCCazbK7j1BfmVG4cd946bqkH3r4um6B22XlNDEwqs4SOZcc1-D1q6JsihGFZHtnZpanpA1tB5MH7jNbXyCvs8yyedTbo178LsomKuAf9Fwau0GJU-SgCe3ZltT6lCyUG1e-ZSQ=w968-h646-no',
  'https://lh3.googleusercontent.com/N4MV6pgU2ooGbPjRqW9WIMIzLrBX7Wp3MD4krE74BSxSmT_VDCEmck-4BOm6SPcoLzHcZaua90t3nBYcAwXuVW8LQ9y1c-qcc9eiAkqj1jfDD9tHb78Pi0NZWXLUDG-JPMCHRGhfl6_u31q-9FZpXfF_DJ-euiSqeiURawQ8uvwDKmDXeP4mMTDxATDsXa7MN60sU7Uf6l1Rq5Zp4kwHm8PukqjrU_ry6dS2gw1ick6lmRlyLLdLFGpqaaMR3XL766Ng7H1U8STKLXRwhBRqIlnyCgZBtZSQiy7c-z37TlAVm8bLWTgETRBeRT-4yKZdKZPTZ0WJ8QN4t5u0woylgiK6zdNgxXh12fRcTvcuVh92MF-SyeA4sWb6nR9H3PGPVZwWRQBdQbXJbOfwTuuzfvFHQopFPLzcaH5Nzs9_vy_sRTeU2EmMaDStqmBFVEvCQ6Uzn6RgcIPqcVt-3dIBOPv25WI7UhdovKwl_v8AqaVC1Qa_E4hhwZdQ1JuZKtHzJ5f4g8l8Akml3U7CbV1y3PNIsXa6XhK8gDxdfM3CTyxKsE2GQmR8z0nlCJ5oGADTxxMMWL1krvDrFhxVD0oBII5iNEAXqTHBDhKBAoj7rn0u1ySYqLfGR8CEUEJ5IiTJ-O13PAq-_wL19pPb1mTLnl2-5pkk4PWk5i6iHXWfr40W5rBlCNSVT0Jn7yYN9g=w968-h646-no',
  'https://lh3.googleusercontent.com/umlbLfFZrimctavSMvgF9u7AJLyXdNi5zRWsCeZW7apHJb37i4qigPBwa8ZQuMbQlvBDxtp0q1tDAP__rEon8W8Gl--imZe6oLZdmCsad9iNF48i3eVW1aDiILZL5m74R9zXCpjQvTeCyKfkBD-gvPabv6hkUQObmUIKSFUZltGeb_pPyp0I9MTgW4n6l07y_6TtRCPfAQdOk3Pl2UkO7CnfG11abSFd3CL6xfeoVtl8RP8Mjz9QohBaxJwQzTzwTml4BfxnesahaqbpyBltOxO7OkWoQ61_la6MBmW5A94e6Blfs79JNACqcT5LVhVm2g8XcaGMpeeDKY_ellJX5BMF1cgA-NuqSzlLiYY0wflYahMb2D0he_pnM30K09ecEixDL3qUrm6I3uKRAB02e2dUrDAQU0Fk1G_30t1J5bBrIB0hNcgrvGmlmHtFKxh0zGFUmBrrtBt4nuBw921-NeVrKDhPSUuvGyid028OEEwb3Yg2Ff1LWMUYrg-dRgNHY_3iFhcI8-g57JDByxLEkSPgM1FtoyoXUCHlbSt_k7OaSFvfu8rgjRln_PMzupb5DBxjwNHjIWwn970HYflbiQq5Z-p9kckCyEdoVksM94RtteJbGeTBNzqHTlFR4W9aQb9hi7mDxvnXiDWrW5aOJDN5ZU-RdnsXoGRF02ZDHvGvKMQ2a5Q3crqjyrqxNQ=w968-h671-no',
  'https://lh3.googleusercontent.com/NqROr4Y2aHmJWJF8-4v4RHNWbQgidOpAgTLviTO-UqY8SssAaIRDjZINeZha8C0PJZ8GnQZM7FvSsJ3wIBTAIytOVfOa1A80NdJPAD4wQFOMEZm6AGc-i9h5Lj4F_sxk1V_KVNZYROcrIf5lrS-Jp5NniIKkeqPJOL-wU5dctezPZKkVED0fiFFKM20xnXjhV06nFLEApcle4DUqcXRnRy8S0OLWYQ3hlhDXVzHHz--9C2GIXq8MRvgz2PmVOrAbzuH7drzzld0mqQe7mewYapRtn4SQNASS2EMoFHC-mOO-mbNSHjJi6PC-5ui9q-JHvVn01tTDuOtPXSo8keHs2JeBJ8fAt9IKiqXCcPeoAuOlUlsN2UrsG55pbUYQem2oZyVJbITxSyabY3vVEjiZgsI6TRoaTjt_42mqN6gKpXb-eFXQCk7QD45bCDz6QpThZiE-lFdY63kZR5Hk6XvqYR8JefjLKoS94W_oyqHUzhTwcAuNx2A6GiNBCs0Ddbt0KdYeFf3B2t4bVOoxPpgHeiqwxdNFKgoQk1wTGNPi-QocY3EvySByxYA0qENaxtFdshcERBb2eKFvrRno0deEzdVQvraTvGmAOK1-czicJ6WNnGPk5zqQ28IuMGKffwDzJap3lIe39L8K_eoYlvgaLn3jJevLAjixeuycNzNOi1t2m7DStuMHMZOXMcbWJQ=w968-h645-no',
  'https://lh3.googleusercontent.com/a4bPqSKlmGcCMBDSzZsVM6o0-5jNHFZ6vAcZtwXmmbLLhpmfq2C7T3sK9tIniLlrjEa78EzJw1qWjTCcIb9vHLw99D-c4bmNnzU_iZ9Gkr1O6JL91-hijRw1O_8F_mVOYVbd_dCjhMwEK-dFKXv8CZhsBKgmfxq4Y9e9JWz2YNxsTddPwczgAFktSJR-Cv4oBY5wEMgKCDzIDbKyDpt7QCC75PtFLodX27u4jhSFr7muZ13KLE5XXDSJn4s14q7HghjTr4qVglWq2UTWDhKSAiRyk-UtuphD2O6FAJ1IAS95y5FKZiY_qtUj3HTqPGLm2biIGG79Tx_ymM_X7Lm76HfvKoRVj2kjjbWcnVZNs6iaofgICROX86gvlhG9HKj4Rpx009jgtoiNM7rb21xIuccxAjdUszHy--kINmfXM_clh4cYsWZr-9wKo70hRI8g5YEPtoz3QTJLXu7AATvaIu7HCcuR7PfHx8RHWxYqADIi5ZwuEfq4QPgtyEh208LcfRVwxwGXvDaB6e-536CtGqC3Ay3JnauRDIU3f6lrNlpFsr8xXPSmr4L8ASV8ELVJegd21TayyG1UAOfCrvb3id5CJBlTXwFBoCgYo4TtbdlbNrje_o4zMuEFLKla_E1O9f3IOS7HdSp8S4_TNuv5RLQuA0_dYkiwWInpy2OGbrsuTWZBEcEevl-DaVaSRg=w968-h678-no',
  'https://lh3.googleusercontent.com/O_uIMnHS2rEVUDpI-a2Ea0m87Gyae2Q69Zv2TRqcNuER50FPlj9-EeaihiSB9_J7T92WgM_-0UPfONo69ioMR3d_RDzxglLHjWtxqhC-Zo_c-rs6j3gXNra3NZxn3xj-cm1ofmujabj74s6IHOJZsBjnXorPBG_hXUrTQkAKrM1w1Gmxde_cL3g6hVGuWBLJDVqVrJhXcB8wqAkyQqNQGylPHv4h-9L4qaG4RQLfVot2fAsqlF_Xaq2gPXaIxnkLftkUMxvPi8sZBMvv81K86jt9XAtpo_PzylwmIKcSOXCxPIw3p19umJzOcZuS95j4Hdd5oD4kxJ-GKHFL-AQ3iKwV9BMDLLSNZMHi4X60Mmb3xWecDwuJN5kUdUYR9WxGgsqMRqB1YCh-ynGXVVztEsqBDFgu5bMeYAXE3HTzO1rEFRoOzzFk2hUH_G_rFH36ZEuNmGg_WS7Cv2tN-NzgErX1SgMXILppEMskVY1q9o9kOPhZBatLLUb3ojp7YwGEWzaov3lBMNhYgok6-pvyrur1Q-s9nfs7jRfKeSQouSHYz1OdNTLyFHidDcHt0dr0InvOR0Ev1gxkO7otq9ebOxVIBKt39yAEsecyDLpE5zXwm-ipATdFIqy5dh19KO4NW5mWTaQrUXdSgq8bcWwSQusQ13juio6Bf0V-3PgA0dbfZbd2Xb80sumNr3JCxQ=w968-h646-no',
];

Promise.all(urls.map((url) => getRekognitionData(url)))
  .then((list) =>
    firebase
      .database()
      .ref('list')
      .set(list.filter((data) => !!data)),
  )
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Global error', error);
    return process.exit(1);
  });
