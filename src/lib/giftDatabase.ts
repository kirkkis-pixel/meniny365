// Comprehensive gift database with hundreds of options
export interface GiftOption {
  title: string;
  why: string;
  vendor: 'alza' | 'mall' | 'bonami' | 'brasty' | 'other';
  affiliateUrl: string;
  tags: string[];
  imageUrl?: string;
  price?: string;
  category: string;
}

// Detailed gift inspiration categories with rich descriptions
export const giftInspirations = {
  'rodina': {
    '10-30': [
      {
        title: 'Bylinková záhrada v kvetináči',
        description: 'Kompletný set pre pestovanie čerstvých bylín doma - bazalka, petržlen, majoránka a tymián s krásnym keramickým kvetináčom a návodom na pestovanie.',
        category: 'domov',
        tags: ['eco', 'praktický', 'fyzický darček']
      },
      {
        title: 'Rodinné puzzle s vlastnou fotkou',
        description: 'Personalizované puzzle s rodinnou fotkou - 500-1000 dielikov v krásnom drevenom boxe. Skvelé pre spoločné večery a rozvíjanie trpezlivosti.',
        category: 'zábava',
        tags: ['hravý', 'fyzický darček', 'osobný']
      },
      {
        title: 'Kuchynská kniha s tradičnými receptami',
        description: 'Elegantná kniha s receptami slovenských tradičných jedál, ktoré si rodina môže varenie spoločne. Obsahuje aj prázdne stránky pre vlastné recepty.',
        category: 'kuchyňa',
        tags: ['tradičný', 'fyzický darček', 'praktický']
      },
      {
        title: 'Dekoratívne sviečky s prírodnými vôňami',
        description: 'Sada 6 sviečok s vôňami levandule, vanilky a citrusov v krásnych sklenených nádobách. Vytvoria útulnú atmosféru v rodinnom dome.',
        category: 'domov',
        tags: ['luxusný', 'fyzický darček', 'relax']
      },
      {
        title: 'Rodinný kalendár s meninami',
        description: 'Veľký nástenný kalendár s meninami, rodinnými výročiami a prázdnymi miestami pre vlastné poznámky. Krásne ilustrácie pre každý mesiac.',
        category: 'praktické',
        tags: ['praktický', 'fyzický darček', 'osobný']
      },
      {
        title: 'Kuchynské nože s dreveným blokom',
        description: 'Profesionálny set kuchynských nožov v drevenom bloku - nôž na chlieb, univerzálny nôž a nôžik. Vysoká kvalita nerezovej ocele.',
        category: 'kuchyňa',
        tags: ['praktický', 'fyzický darček', 'kvalitný']
      },
      {
        title: 'Rodinné CD s hudbou z detstva',
        description: 'Personalizované CD s hudbou, ktorú rodina počúvala počas detstva - mix slovenských hitov a medzinárodných klasík. Vlastný dizajn obalu.',
        category: 'zábava',
        tags: ['osobný', 'fyzický darček', 'tradičný']
      },
      {
        title: 'Dekoratívne podložky s rodinnými motívmi',
        description: 'Sada 8 podložiek s krásnymi motívmi - strom života, rodinné stopy, srdcia. Vyrobené z prírodných materiálov, vhodné pre každý štýl.',
        category: 'domov',
        tags: ['dekoratívny', 'fyzický darček', 'eco']
      },
      {
        title: 'Rodinná hra na stolný futbal',
        description: 'Kompaktný stolný futbal pre zábavné rodinné súťaže. Vysoká kvalita materiálov a jednoduché pravidlá pre všetky veky.',
        category: 'zábava',
        tags: ['hravý', 'fyzický darček', 'interaktívny']
      },
      {
        title: 'Kuchynské utierky s vlastným potlačom',
        description: 'Sada 6 kuchynských utierok s rodinnými fotkami alebo vtipnými nápismi. Kvalitný bavlnený materiál a odolný potlač.',
        category: 'kuchyňa',
        tags: ['osobný', 'fyzický darček', 'praktický']
      },
      {
        title: 'Dekoratívne vázanie na kvety',
        description: 'Elegantné sklenené vázy v rôznych veľkostiach pre čerstvé kvety. Moderný dizajn, ktorý ozdobí každý domov.',
        category: 'domov',
        tags: ['dekoratívny', 'fyzický darček', 'elegantný']
      },
      {
        title: 'Rodinné CD s vlastnou hudbou',
        description: 'Personalizované CD s hudbou, ktorú rodina miluje - mix slovenských hitov a medzinárodných klasík. Vlastný dizajn obalu.',
        category: 'zábava',
        tags: ['osobný', 'fyzický darček', 'tradičný']
      },
      {
        title: 'Kuchynské príslušenstvo - drevené varechy',
        description: 'Kvalitné drevené varechy a kuchynské náčinie z bukového dreva. Prirodzené a bezpečné pre varenie.',
        category: 'kuchyňa',
        tags: ['eco', 'fyzický darček', 'praktický']
      },
      {
        title: 'Dekoratívne sviečky s prírodnými vôňami',
        description: 'Sada 6 sviečok s vôňami levandule, vanilky a citrusov v krásnych sklenených nádobách. Vytvoria útulnú atmosféru.',
        category: 'domov',
        tags: ['luxusný', 'fyzický darček', 'relax']
      },
      {
        title: 'Bylinkové čaje z vlastnej záhrady',
        description: 'Sada 5 druhov bylinkových čajov - mäta, medovka, heřmánek, lipový kvet a ruža. Prírodné a zdravé pre celú rodinu.',
        category: 'kuchyňa',
        tags: ['eco', 'fyzický darček', 'zdravý']
      }
    ],
    '30-60': [
      {
        title: 'Smart home zariadenie pre pohodlie',
        description: 'Inteligentné svetlá alebo termostat, ktoré sa dajú ovládať cez telefón. Zjednodušia každodenný život celej rodiny a ušetria energiu.',
        category: 'technológie',
        tags: ['digitálne', 'praktický', 'moderný']
      },
      {
        title: 'Rodinný wellness pobyt',
        description: 'Víkendový pobyt v wellness hoteli pre celú rodinu - masáže, bazén, sauna a zdravé jedlo. Nezabudnuteľný čas pre relax a spoločné chvíle.',
        category: 'zážitok',
        tags: ['zážitok', 'luxusný', 'relax']
      },
      {
        title: 'Kuchynský robot s príslušenstvom',
        description: 'Výkonný kuchynský robot s mixérom, šľahačom a príslušenstvom na cestoviny. Zjednoduší varenie a umožní experimentovať s novými receptmi.',
        category: 'kuchyňa',
        tags: ['praktický', 'fyzický darček', 'kvalitný']
      },
      {
        title: 'Dekoratívne svietidlá do obývačky',
        description: 'Elegantné podlahové alebo stolné svietidlá, ktoré vytvoria útulnú atmosféru. Moderný dizajn, ktorý sa hodí do každého interiéru.',
        category: 'domov',
        tags: ['dekoratívny', 'fyzický darček', 'elegantný']
      },
      {
        title: 'Rodinné fotoalbum s profesionálnymi fotkami',
        description: 'Luxusné fotoalbum s najkrajšími rodinnými fotkami - svadba, narodeniny, dovolenky. Profesionálne spracované a v krásnom koženom obale.',
        category: 'spomienky',
        tags: ['osobný', 'fyzický darček', 'luxusný']
      },
      {
        title: 'Kuchynské spotrebiče - mixér a kávovar',
        description: 'Sada kvalitných kuchynských spotrebičov - výkonný mixér na smoothie a automatický kávovar. Pre milovníkov zdravého životného štýlu.',
        category: 'kuchyňa',
        tags: ['praktický', 'fyzický darček', 'zdravý']
      }
    ],
    '60+': [
      {
        title: 'Smart TV s rodinným balíkom',
        description: 'Veľký 55" Smart TV s predplatným na streaming služby a rodinnými hrami. Perfektné pre spoločné sledovanie filmov a hranie hier.',
        category: 'zábava',
        tags: ['digitálne', 'luxusný', 'zábavný']
      },
      {
        title: 'Rodinná dovolenka v exotickej destinácii',
        description: '7-dňový pobyt pre celú rodinu v krásnej destinácii - letenky, ubytovanie a výlety. Nezabudnuteľný zážitok, ktorý rodina bude pamätať navždy.',
        category: 'zážitok',
        tags: ['zážitok', 'luxusný', 'exotický']
      },
      {
        title: 'Kuchynský robot s AI funkciami',
        description: 'Najnovší kuchynský robot s umelou inteligenciou - automaticky upraví recepty, navrhne jedlá a ovláda sa cez aplikáciu. Revolúcia v kuchyni.',
        category: 'technológie',
        tags: ['digitálne', 'luxusný', 'moderný']
      },
      {
        title: 'Dekoratívne svietidlá s LED technológiou',
        description: 'Moderné LED svietidlá s možnosťou zmeny farieb a intenzity svetla. Vytvoria úžasnú atmosféru pre každú príležitosť.',
        category: 'domov',
        tags: ['digitálne', 'luxusný', 'moderný']
      }
    ]
  },
  'priatel': {
    '10-30': [
      {
        title: 'Craft pivný set s ochutnávkou',
        description: 'Elegantný set s 6 rôznymi craft pivami z lokálnych pivovarov, pivnými pohármi a ochutnávacím lístkom. Pre skutočného milovníka piva.',
        category: 'zábava',
        tags: ['luxusný', 'fyzický darček', 'hobby']
      },
      {
        title: 'Gaming doplnky - mechanická klávesnica',
        description: 'Profesionálna mechanická klávesnica s RGB podsvietením a mechanickými prepínačmi. Perfektná pre gaming a prácu na počítači.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Kniha o hobby s praktickými tipmi',
        description: 'Odborná kniha o jeho koníčku - napr. rybárstvo, modelárstvo, elektronika - s praktickými návodmi a tipmi od expertov.',
        category: 'hobby',
        tags: ['praktický', 'fyzický darček', 'vzdelávací']
      },
      {
        title: 'Sportové potreby pre outdoor aktivity',
        description: 'Kvalitné outdoor vybavenie - batoh, čelovka, multitool - pre jeho outdoor aktivity. Vysoká kvalita materiálov a funkčnosť.',
        category: 'šport',
        tags: ['praktický', 'fyzický darček', 'outdoor']
      },
      {
        title: 'Elektronické doplnky pre hobby',
        description: 'Praktické elektronické nástroje - multimeter, spájkovacia stanica, digitálny uhlomer - pre jeho elektronické projekty.',
        category: 'hobby',
        tags: ['praktický', 'fyzický darček', 'technický']
      },
      {
        title: 'Gaming myš s programovateľnými tlačidlami',
        description: 'Profesionálna gaming myš s vysokým DPI, programovateľnými tlačidlami a ergonomickým dizajnom. Pre vášnivého gamera.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Craft pivný set s ochutnávkou',
        description: 'Elegantný set s 6 rôznymi craft pivami z lokálnych pivovarov, pivnými pohármi a ochutnávacím lístkom. Pre skutočného milovníka piva.',
        category: 'zábava',
        tags: ['luxusný', 'fyzický darček', 'hobby']
      },
      {
        title: 'Kniha o hobby s praktickými tipmi',
        description: 'Odborná kniha o jeho koníčku - napr. rybárstvo, modelárstvo, elektronika - s praktickými návodmi a tipmi od expertov.',
        category: 'hobby',
        tags: ['praktický', 'fyzický darček', 'vzdelávací']
      },
      {
        title: 'Sportové potreby pre outdoor aktivity',
        description: 'Kvalitné outdoor vybavenie - batoh, čelovka, multitool - pre jeho outdoor aktivity. Vysoká kvalita materiálov a funkčnosť.',
        category: 'šport',
        tags: ['praktický', 'fyzický darček', 'outdoor']
      },
      {
        title: 'Elektronické doplnky pre hobby',
        description: 'Praktické elektronické nástroje - multimeter, spájkovacia stanica, digitálny uhlomer - pre jeho elektronické projekty.',
        category: 'hobby',
        tags: ['praktický', 'fyzický darček', 'technický']
      },
      {
        title: 'Gaming podložka s RGB podsvietením',
        description: 'Veľká gaming podložka s RGB podsvietením a ergonomickým dizajnom. Perfektná pre gaming a prácu na počítači.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Bezdrôtové slúchadlá pre gaming',
        description: 'Vysokokvalitné bezdrôtové slúchadlá s nízkym oneskorením a výborným zvukom. Ideálne pre gaming a hudbu.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Mechanická klávesnica s RGB podsvietením',
        description: 'Profesionálna mechanická klávesnica s RGB podsvietením a mechanickými prepínačmi. Perfektná pre gaming a prácu.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Vtipné tričko s gaming motívom',
        description: 'Kvalitné bavlnené tričko s vtipným gaming nápisom alebo obrázkom. Perfektné pre každodenné nosenie.',
        category: 'zábava',
        tags: ['fyzický darček', 'hravý', 'praktický']
      },
      {
        title: 'Gaming stolička s ergonomickým dizajnom',
        description: 'Pohodlná gaming stolička s nastaviteľnou výškou a opierkou. Pre dlhé gaming sessiony a prácu.',
        category: 'gaming',
        tags: ['praktický', 'fyzický darček', 'luxusný']
      },
      {
        title: 'Bezdrôtové slúchadlá s mikrofonom',
        description: 'Vysokokvalitné bezdrôtové slúchadlá s mikrofonom pre gaming a komunikáciu. Nízke oneskorenie a výborný zvuk.',
        category: 'gaming',
        tags: ['digitálne', 'praktický', 'hravý']
      },
      {
        title: 'Gaming monitor s vysokým rozlíšením',
        description: 'Veľký gaming monitor s vysokým rozlíšením a rýchlym refresh rate. Perfektný pre gaming a prácu.',
        category: 'gaming',
        tags: ['digitálne', 'luxusný', 'praktický']
      },
      {
        title: 'Gaming podložka s RGB podsvietením',
        description: 'Veľká gaming podložka s RGB podsvietením a ergonomickým dizajnom. Perfektná pre gaming a prácu na počítači.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Gaming ovládač pre PC',
        description: 'Profesionálny gaming ovládač pre PC s programovateľnými tlačidlami. Ideálny pre hry a emulátory.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'praktický']
      },
      {
        title: 'Gaming slúchadlá s 7.1 surround zvukom',
        description: 'Profesionálne gaming slúchadlá s 7.1 surround zvukom a RGB podsvietením. Pre skutočný gaming zážitok.',
        category: 'gaming',
        tags: ['digitálne', 'luxusný', 'hravý']
      }
    ],
    '30-60': [
      {
        title: 'Smart hodinky s GPS a fitness funkciami',
        description: 'Moderné smart hodinky s GPS, monitorovaním srdcového tepu, krokomera a notifikáciami. Perfektné pre aktívneho človeka.',
        category: 'technológie',
        tags: ['digitálne', 'luxusný', 'praktický']
      },
      {
        title: 'Gaming konzola s hrami',
        description: 'Najnovšia herná konzola s 3-5 populárnymi hrami a dodatočným ovládačom. Pre skutočného gaming nadšenca.',
        category: 'gaming',
        tags: ['digitálne', 'hravý', 'luxusný']
      },
      {
        title: 'Profesionálne nástroje pre hobby',
        description: 'Kvalitné nástroje pre jeho koníček - napr. pre modelárstvo, elektroniku alebo opravy. Profesionálna kvalita a trvanlivosť.',
        category: 'hobby',
        tags: ['praktický', 'fyzický darček', 'kvalitný']
      },
      {
        title: 'Sportové vybavenie pre fitness',
        description: 'Kompletný set pre domácí fitness - činky, podložka, odporové gumy a návod na cvičenie. Pre zdravý životný štýl.',
        category: 'šport',
        tags: ['praktický', 'fyzický darček', 'zdravý']
      }
    ],
    '60+': [
      {
        title: 'Horský bicykel s príslušenstvom',
        description: 'Kvalitný horský bicykel s odpružením, kvalitnými brzdami a príslušenstvom - prilba, rukavice, náhradné diely. Pre outdoor nadšenca.',
        category: 'šport',
        tags: ['praktický', 'fyzický darček', 'outdoor']
      },
      {
        title: 'Gaming PC setup s monitormi',
        description: 'Kompletný gaming setup - výkonný PC, gaming monitor, mechanická klávesnica a myš. Pre skutočného gaming profesionála.',
        category: 'gaming',
        tags: ['digitálne', 'luxusný', 'hravý']
      },
      {
        title: 'Profesionálne nástroje a vybavenie',
        description: 'Kompletný set profesionálnych nástrojov pre jeho hobby - napr. pre elektroniku, modelárstvo alebo opravy. Najvyššia kvalita.',
        category: 'hobby',
        tags: ['praktický', 'fyzický darček', 'profesionálny']
      }
    ]
  },
  'kolega': {
    '10-30': [
      {
        title: 'Elegantný zápisník s perom',
        description: 'Kvalitný kožený zápisník s perom a prázdnymi listami. Perfektný pre pracovné poznámky a nápady. Elegantný a praktický.',
        category: 'práca',
        tags: ['minimalistický', 'fyzický darček', 'elegantný']
      },
      {
        title: 'Káva a čaj set s exotickými chutami',
        description: 'Dômyselný set s 5 druhmi prémiových káv a čajov z rôznych krajín. S krásnym servisom a návodom na prípravu.',
        category: 'práca',
        tags: ['luxusný', 'fyzický darček', 'relax']
      },
      {
        title: 'Stabilizátor pre telefón a tablet',
        description: 'Profesionálny stabilizátor pre videohovory a prácu s tabletom. Ergonomický dizajn a vysoká kvalita materiálov.',
        category: 'práca',
        tags: ['praktický', 'fyzický darček', 'moderný']
      },
      {
        title: 'Kancelárske kreslo s ergonomickým dizajnom',
        description: 'Kvalitné kancelárske kreslo s nastaviteľnou výškou, opierkou na hlavu a bedrovú opierku. Pre pohodlnú prácu.',
        category: 'práca',
        tags: ['praktický', 'fyzický darček', 'zdravý']
      },
      {
        title: 'Kancelárske potreby v elegantnom boxe',
        description: 'Sada kvalitných kancelárskych potrieb - perá, ceruzky, zvýrazňovače, sponky - v krásnom drevenom boxe.',
        category: 'práca',
        tags: ['minimalistický', 'fyzický darček', 'praktický']
      }
    ],
    '30-60': [
      {
        title: 'Profesionálny tablet s príslušenstvom',
        description: 'Výkonný tablet s klávesnicou, perom a ochranným púzdrom. Perfektný pre prácu na cestách a prezentácie.',
        category: 'práca',
        tags: ['digitálne', 'praktický', 'moderný']
      },
      {
        title: 'Kancelárske kreslo s masážnou funkciou',
        description: 'Luxusné kancelárske kreslo s elektrickou masážnou funkciou, vyhrievaním a nastaviteľnými opierkami. Pre maximálne pohodlie.',
        category: 'práca',
        tags: ['luxusný', 'fyzický darček', 'relax']
      },
      {
        title: 'Smart hodinky pre profesionála',
        description: 'Elegantné smart hodinky s notifikáciami, kalendárom a fitness funkciami. Perfektné pre moderného profesionála.',
        category: 'práca',
        tags: ['digitálne', 'luxusný', 'praktický']
      }
    ],
    '60+': [
      {
        title: 'Profesionálny notebook s príslušenstvom',
        description: 'Výkonný notebook s vysokým rozlíšením, rýchlym procesorom a všetkým potrebným príslušenstvom. Pre náročnú prácu.',
        category: 'práca',
        tags: ['digitálne', 'luxusný', 'profesionálny']
      },
      {
        title: 'Kancelársky nábytok - pracovný stôl',
        description: 'Kvalitný pracovný stôl s nastaviteľnou výškou, úložným priestorom a káblovým manažmentom. Pre modernú kanceláriu.',
        category: 'práca',
        tags: ['praktický', 'fyzický darček', 'moderný']
      }
    ]
  },
  'partner': {
    '10-30': [
      {
        title: 'Romantická sviečka s osobnou vôňou',
        description: 'Krásna sviečka s vôňou, ktorá mu/jej pripomína vaše spoločné chvíle - vanilka, levanduľa alebo exotické ovocie. V elegantnom sklenenom obale.',
        category: 'romantika',
        tags: ['romantický', 'fyzický darček', 'osobný']
      },
      {
        title: 'Fotokniha spomienok na mieru',
        description: 'Personalizovaná fotokniha s najkrajšími spomienkami - prvé rande, dovolenky, výročia. Profesionálne spracované v luxusnom formáte.',
        category: 'spomienky',
        tags: ['romantický', 'fyzický darček', 'osobný']
      },
      {
        title: 'Romantické šperky s osobným nápisom',
        description: 'Elegantný náhrdelník alebo náramok s gravírovaným nápisom alebo dátumom. Jemné a elegantné, vhodné na každý deň.',
        category: 'šperky',
        tags: ['romantický', 'fyzický darček', 'osobný']
      },
      {
        title: 'Dvojitá hrneček s vašimi menami',
        description: 'Krásny keramický hrneček s vašimi menami a romantickým nápisom. Perfektný pre spoločné ráno s kávou.',
        category: 'romantika',
        tags: ['romantický', 'fyzický darček', 'osobný']
      }
    ],
    '30-60': [
      {
        title: 'Šperky s diamantom a osobným nápisom',
        description: 'Elegantný prsteň alebo náušnice s malým diamantom a gravírovaným osobným nápisom. Luxusný a osobný darček.',
        category: 'šperky',
        tags: ['romantický', 'fyzický darček', 'luxusný']
      },
      {
        title: 'Romantický víkend v luxusnom hoteli',
        description: '2-noc pobyt v romantickom hoteli s masážami, večerou pri sviečkach a spa procedúrami. Nezabudnuteľný čas pre dva.',
        category: 'zážitok',
        tags: ['romantický', 'zážitok', 'luxusný']
      },
      {
        title: 'Hodinky s osobným nápisom',
        description: 'Elegantné hodinky s gravírovaným osobným nápisom na zadnej strane. Kvalitné materiály a jemný dizajn.',
        category: 'šperky',
        tags: ['romantický', 'fyzický darček', 'elegantný']
      }
    ],
    '60+': [
      {
        title: 'Drahé hodinky ako symbol lásky',
        description: 'Luxusné hodinky s kvalitným mechanizmom a osobným nápisom. Symbol trvalej lásky a spoločnej budúcnosti.',
        category: 'šperky',
        tags: ['romantický', 'fyzický darček', 'luxusný']
      },
      {
        title: 'Exotická dovolenka pre dva',
        description: '7-dňový pobyt v exotickej destinácii - letenky, luxusné ubytovanie, romantické večere a výlety. Nezabudnuteľný zážitok.',
        category: 'zážitok',
        tags: ['romantický', 'zážitok', 'luxusný']
      }
    ]
  }
};

// Style and type combinations
export const styleDescriptions = {
  'minimalistický': ['Elegantný', 'Jednoduchý', 'Čistý', 'Moderný', 'Sofistikovaný'],
  'luxusný': ['Exkluzívny', 'Drahý', 'Prémiový', 'Elegantný', 'Vysoká kvalita'],
  'hravý': ['Zábavný', 'Kreatívny', 'Interaktívny', 'Dynamický', 'Veselý'],
  'eco': ['Ekológický', 'Prírodný', 'Udržateľný', 'Organický', 'Zelený']
};

export const typeDescriptions = {
  'zážitok': ['Nezabudnuteľný zážitok', 'Spoločný čas', 'Nové skúsenosti', 'Pamätné chvíle'],
  'fyzický darček': ['Hmatateľný darček', 'Trvalý darček', 'Praktický darček', 'Užitočný darček'],
  'digitálne': ['Moderné riešenie', 'Technologický darček', 'Digitálny darček', 'Elektronický darček']
};

// Vendor information
export const vendorInfo = {
  alza: { name: 'Alza.sk', color: 'bg-red-500', logo: 'A' },
  mall: { name: 'Mall.sk', color: 'bg-blue-500', logo: 'M' },
  bonami: { name: 'Bonami', color: 'bg-green-500', logo: 'B' },
  brasty: { name: 'Brasty', color: 'bg-purple-500', logo: 'B' },
  other: { name: 'Iné', color: 'bg-slate-500', logo: '?' }
};

// Generate detailed gift inspiration suggestions
export function generateGiftSuggestions(
  budget: string,
  relationship: string,
  type: string[],
  style: string[],
  name?: string
): GiftOption[] {
  const suggestions: GiftOption[] = [];
  const baseGifts = giftInspirations[relationship]?.[budget] || [];
  
  // If we don't have enough gifts for the relationship/budget, get from other budgets
  let allGifts = [...baseGifts];
  if (allGifts.length < 10) {
    const otherBudgets = Object.keys(giftInspirations[relationship] || {});
    for (const otherBudget of otherBudgets) {
      if (otherBudget !== budget) {
        allGifts = [...allGifts, ...(giftInspirations[relationship]?.[otherBudget] || [])];
      }
    }
  }
  
  // Shuffle and take unique gifts
  const shuffledGifts = [...allGifts].sort(() => Math.random() - 0.5);
  const uniqueGifts = shuffledGifts.filter((gift, index, self) => 
    index === self.findIndex(g => g.title === gift.title)
  );
  
  // Generate 12-15 unique suggestions
  const numSuggestions = Math.min(15, uniqueGifts.length);
  
  for (let i = 0; i < numSuggestions; i++) {
    const baseGift = uniqueGifts[i];
    const title = personalizeGiftTitle(baseGift.title, name);
    const why = baseGift.description;
    const tags = [...baseGift.tags, ...generateAdditionalTags(type, style, budget)];
    const category = baseGift.category;
    
    suggestions.push({
      title,
      why,
      vendor: 'other',
      affiliateUrl: generateInspirationUrl(baseGift.title, baseGift.category),
      tags,
      category,
      price: getPriceFromBudget(budget)
    });
  }
  
  return suggestions;
}

function personalizeGiftTitle(title: string, name?: string): string {
  if (!name) return title;
  
  const personalizations = [
    `Osobný ${title.toLowerCase()} pre ${name}`,
    `${title} s osobným nápisom pre ${name}`,
    `Špeciálny ${title.toLowerCase()} pre ${name}`,
    `${title} na mieru pre ${name}`,
    `Exkluzívny ${title.toLowerCase()} pre ${name}`
  ];
  
  return personalizations[Math.floor(Math.random() * personalizations.length)];
}

function generateWhyDescription(
  title: string,
  relationship: string,
  type: string[],
  style: string[],
  name?: string
): string {
  const relationshipReasons = {
    'rodina': ['pre rodinné chvíle', 'pre spoločné zážitky', 'pre rodinnú pohodu', 'pre rodinné tradície'],
    'priatel': ['pre vášho priateľa', 'pre spoločné aktivity', 'pre priateľské chvíle', 'pre hobby vášho priateľa'],
    'kolega': ['pre pracovné úspechy', 'pre profesionálny rozvoj', 'pre kancelársku pohodu', 'pre pracovné úlohy'],
    'partner': ['pre romantické chvíle', 'pre spoločnú lásku', 'pre romantické večery', 'pre vašu lásku']
  };
  
  const typeReasons = typeDescriptions[type[0]] || ['skvelý darček'];
  const styleReasons = styleDescriptions[style[0]] || ['kvalitný darček'];
  
  const reasons = [
    ...relationshipReasons[relationship] || ['skvelý darček'],
    ...typeReasons,
    ...styleReasons
  ];
  
  const selectedReason = reasons[Math.floor(Math.random() * reasons.length)];
  return `${selectedReason.charAt(0).toUpperCase() + selectedReason.slice(1)}.`;
}

function getRandomVendor(): 'alza' | 'mall' | 'bonami' | 'brasty' | 'other' {
  const vendors = ['alza', 'mall', 'bonami', 'brasty', 'other'] as const;
  return vendors[Math.floor(Math.random() * vendors.length)];
}

function generateTags(type: string[], style: string[], budget: string): string[] {
  const tags = [...type, ...style];
  
  // Add budget-based tags
  if (budget === '10-30') tags.push('rozpočtový');
  if (budget === '30-60') tags.push('stredný');
  if (budget === '60+') tags.push('luxusný');
  
  // Add random additional tags
  const additionalTags = ['kvalitný', 'praktický', 'elegantný', 'modernejší', 'tradičný'];
  const randomTag = additionalTags[Math.floor(Math.random() * additionalTags.length)];
  if (!tags.includes(randomTag)) {
    tags.push(randomTag);
  }
  
  return tags;
}

function getCategoryFromTitle(title: string): string {
  if (title.includes('kuchyn') || title.includes('káva') || title.includes('čaj')) return 'kuchyňa';
  if (title.includes('gaming') || title.includes('elektron') || title.includes('digitál')) return 'technológie';
  if (title.includes('romant') || title.includes('šperk') || title.includes('sviečka')) return 'romantika';
  if (title.includes('sport') || title.includes('bicykel') || title.includes('fitness')) return 'šport';
  if (title.includes('kancelár') || title.includes('práca') || title.includes('notebook')) return 'práca';
  return 'všeobecné';
}

function generateInspirationUrl(title: string, category: string): string {
  const searchTerm = encodeURIComponent(`${title} darček ${category}`);
  return `https://google.sk/search?q=${searchTerm}`;
}

function generateAdditionalTags(type: string[], style: string[], budget: string): string[] {
  const tags = [];
  
  // Add budget-based tags
  if (budget === '10-30') tags.push('rozpočtový');
  if (budget === '30-60') tags.push('stredný');
  if (budget === '60+') tags.push('luxusný');
  
  // Add random additional tags
  const additionalTags = ['kvalitný', 'praktický', 'elegantný', 'modernejší', 'tradičný'];
  const randomTag = additionalTags[Math.floor(Math.random() * additionalTags.length)];
  if (!tags.includes(randomTag)) {
    tags.push(randomTag);
  }
  
  return tags;
}

function getPriceFromBudget(budget: string): string {
  const prices = {
    '10-30': '15-25 €',
    '30-60': '35-55 €',
    '60+': '65-150 €'
  };
  
  return prices[budget] || 'Cena na požiadanie';
}
