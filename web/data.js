const tripData = {
    config: {
        title: "台南高雄 3 天 2 夜藝文交響與慢活之旅",
        subtitle: "漢斯季默史響巨蛋震撼・奇美特展與府城溫體牛饗宴",
        dates: "2026.09.18 - 09.20 (3天2夜)",
        travelers: "哲健 & 周庭（Day 2 淳閔加入）",
        themeColor: "#38bdf8"
    },
    days: [
        {
            id: "day1",
            dayNum: 1,
            title: "提早南下 ➔ 安平夕照 ✕ 出海口夜景 ✕ 慢活府城之夜",
            date: "09/18 (週五)",
            color: "#38bdf8",
            hotelStart: "竹科 F12P7",
            hotelEnd: "台南大員皇冠假日酒店",
            googleMapsUrl: "https://www.google.com/maps/dir/新竹科學園區/台南大員皇冠假日酒店",
            stops: [
                {
                    id: 1,
                    shortName: "竹科出發",
                    time: "15:00",
                    name: "竹科（台積 F12P7）出發",
                    category: "transport",
                    categoryLabel: "出發點",
                    desc: "提早啟程搶先南下，行車順暢安全，途中可於西螺服務區小憩片刻。",
                    lat: 24.7737,
                    lng: 121.0122,
                    stay: "3小時車程",
                    tips: "避開國道一號下班尖峰車潮",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=台積電F12"
                },
                {
                    id: 2,
                    shortName: "大員皇冠",
                    time: "18:00",
                    name: "台南大員皇冠假日酒店 (Crowne Plaza)",
                    category: "hotel",
                    categoryLabel: "住宿飯店",
                    desc: "辦理入住、放置行李，至房間景觀陽台感受鹽水溪出海口日落與晚風，欣賞大廳魚簍裝置藝術。",
                    lat: 23.0031,
                    lng: 120.1585,
                    stay: "辦理入住",
                    tips: "連住兩晚，享受五星級衛浴與舒適床寢",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=台南大員皇冠假日酒店"
                },
                {
                    id: 3,
                    shortName: "安平晚餐",
                    time: "19:00",
                    name: "府城首夜晚餐（彈性備案選擇）",
                    category: "food",
                    categoryLabel: "晚餐美食",
                    desc: "時間充裕，可優雅選擇飯店內 500 盤粵菜（彩豐樓），或前往安平市區享用溫體牛肉湯（文章/阿財牛肉湯）。",
                    lat: 23.0019,
                    lng: 120.1610,
                    stay: "1.5小時",
                    tips: "依照當晚飢餓度與體力彈性挑選",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=台南市安平區"
                },
                {
                    id: 4,
                    shortName: "客房休息",
                    time: "21:00",
                    name: "飯店客房休養",
                    category: "hotel",
                    categoryLabel: "夜間休息",
                    desc: "享受飯店三溫暖水療池或舒適客房，為週六重頭戲蓄滿精力。",
                    lat: 23.0031,
                    lng: 120.1585,
                    stay: "夜宿",
                    tips: "雨備：館內溫水恆溫泳池與健身中心",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=台南大員皇冠假日酒店"
                }
            ]
        },
        {
            id: "day2",
            dayNum: 2,
            title: "高雄好友相聚午餐 ✕ 光影散策 ✕ 捷運避塞 ✕ 漢斯季默交響夜",
            date: "09/19 (週六)",
            color: "#f43f5e",
            hotelStart: "台南大員皇冠假日酒店",
            hotelEnd: "高雄巨蛋 / 飯店",
            googleMapsUrl: "https://www.google.com/maps/dir/台南大員皇冠假日酒店/高雄巨蛋",
            stops: [
                {
                    id: 1,
                    shortName: "台南出發",
                    time: "09:30",
                    name: "由台南出發南下高雄",
                    category: "transport",
                    categoryLabel: "交通移動",
                    desc: "在飯店享用早餐後退房出發，走台 86 接國道一號南下前往高雄，與淳閔會合。",
                    lat: 22.9972,
                    lng: 120.2123,
                    stay: "50分車程",
                    tips: "精神飽滿展開週六行程",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=高雄市"
                },
                {
                    id: 2,
                    shortName: "好友聚餐",
                    time: "11:30",
                    name: "好友午餐聚會：與淳閔聚餐",
                    category: "food",
                    categoryLabel: "精選聚餐",
                    desc: "推薦三選一：【老新台菜十全店】現代台菜洋樓 / 【唐諾廚房】質感工業風餐館 / 【慢牛牛肉料理】無國界文青餐館。",
                    lat: 22.6462,
                    lng: 120.3075,
                    stay: "2小時",
                    tips: "🔥 務必提前 1-2 週完成預訂！",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=老新台菜十全店"
                },
                {
                    id: 3,
                    shortName: "文藝散策",
                    time: "13:45",
                    name: "文藝散策二擇一（戶外愛河灣 / 內惟藝術中心）",
                    category: "spot",
                    categoryLabel: "午後散策",
                    desc: "提案A：高流中心與大港橋漫步愛河灣。提案B：內惟藝術中心與高美館生態池草坡漫步，陪伴好友散步聊天。",
                    lat: 22.6189,
                    lng: 120.2882,
                    stay: "2小時",
                    tips: "雨備：改往全室內的內惟藝術中心",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=高雄流行音樂中心大港橋"
                },
                {
                    id: 4,
                    shortName: "左營捷運",
                    time: "17:00",
                    name: "高鐵左營站周邊停車 ➔ 搭高捷紅線",
                    category: "transport",
                    categoryLabel: "核心戰略",
                    desc: "車輛停放左營站周邊，轉乘捷運紅線直達巨蛋站（2站，4分鐘），完美避開漢神巨蛋打結車流。",
                    lat: 22.6874,
                    lng: 120.3117,
                    stay: "捷運4分鐘",
                    tips: "🔥 絕對不要直接開車進巨蛋地下停車場",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=高鐵左營站"
                },
                {
                    id: 5,
                    shortName: "巨蛋晚餐",
                    time: "17:30",
                    name: "巨蛋商圈快速晚餐",
                    category: "food",
                    categoryLabel: "迅速晚餐",
                    desc: "推薦弘記肉燥飯舖（必比登）、和林拾麵，或漢神巨蛋 B1 美饌街（丸亀製麵/咖哩），15分鐘搞定不耽誤。",
                    lat: 22.6661,
                    lng: 120.3015,
                    stay: "45分",
                    tips: "出餐迅速、輕鬆步行進場",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=高雄巨蛋商圈"
                },
                {
                    id: 6,
                    shortName: "音樂會",
                    time: "19:30",
                    name: "🎵 漢斯季默世界巡迴音樂會 (高雄巨蛋)",
                    category: "spot",
                    categoryLabel: "重磅音樂會",
                    desc: "親臨現場聆聽《星際效應》、《黑暗騎士》、《沙丘》等神作，感受頂級交響音壓與物理動態震撼！",
                    lat: 22.6666,
                    lng: 120.3023,
                    stay: "19:00入場 / 22:00散場",
                    tips: "19:00 開放入場，全室內無懼雨天",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=高雄巨蛋"
                },
                {
                    id: 7,
                    shortName: "返回台南",
                    time: "22:15",
                    name: "捷運回左營取車 ➔ 夜駕返回台南",
                    category: "transport",
                    categoryLabel: "深夜北返",
                    desc: "搭捷運回左營取車，直上國道十號接國一順暢返回安平大員皇冠假日酒店休息。",
                    lat: 23.0031,
                    lng: 120.1585,
                    stay: "50分車程",
                    tips: "終點：返回大員皇冠休息",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=台南大員皇冠假日酒店"
                }
            ]
        },
        {
            id: "day3",
            dayNum: 3,
            title: "慢活退房 ✕ 仁德溫體牛午宴 ✕ 奇美特展 ✕ 順暢北返竹南",
            date: "09/20 (週日)",
            color: "#10b981",
            hotelStart: "台南大員皇冠假日酒店",
            hotelEnd: "竹南勝麗 A+ 溫暖的家",
            googleMapsUrl: "https://www.google.com/maps/dir/台南大員皇冠假日酒店/奇美博物館/苗栗縣竹南鎮",
            stops: [
                {
                    id: 1,
                    shortName: "悠閒退房",
                    time: "10:00",
                    name: "悠閒退房 ➔ 走台 86 前往仁德",
                    category: "hotel",
                    categoryLabel: "退房出發",
                    desc: "大廳魚簍裝置留影後退房，走台 86 線快速道路前往仁德，採取「先吃後逛」最佳順序。",
                    lat: 23.0031,
                    lng: 120.1585,
                    stay: "20分車程",
                    tips: "避開候位人潮的黃金時間",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=台南大員皇冠假日酒店"
                },
                {
                    id: 2,
                    shortName: "阿裕溫體牛",
                    time: "10:45",
                    name: "午餐：阿裕牛肉涮涮鍋（崑崙店）",
                    category: "food",
                    categoryLabel: "頂級溫體牛",
                    desc: "千坪挑高旗艦店，第一輪入座品嚐現切溫體鮮牛肉與蔬果大骨清甜高湯，肉燥飯無限供應。",
                    lat: 22.9645,
                    lng: 120.2458,
                    stay: "1.5小時",
                    tips: "備案：輝哥本土牛肉爐（免排隊私房）",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=阿裕牛肉涮涮鍋崑崙店"
                },
                {
                    id: 3,
                    shortName: "奇美特展",
                    time: "12:30",
                    name: "奇美博物館特展參訪 ＆ 歐式庭園漫步",
                    category: "spot",
                    categoryLabel: "奇美博物館",
                    desc: "參觀當期重磅特展（已預約 12:30/13:00 時段），展後於阿波羅噴泉廣場與歐式建築群拍照。",
                    lat: 22.9348,
                    lng: 120.2241,
                    stay: "2.5小時",
                    tips: "🔥 務必提前線上預約購票",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=奇美博物館"
                },
                {
                    id: 4,
                    shortName: "北返竹南",
                    time: "15:30",
                    name: "仁德交流道啟程北返（竹南）",
                    category: "transport",
                    categoryLabel: "順暢北返",
                    desc: "看完展後直接由仁德交流道上國道一號北返，避開週日傍晚尖峰車潮。",
                    lat: 22.9712,
                    lng: 120.2315,
                    stay: "2.5-3小時",
                    tips: "途中可於服務區休息",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=國道一號仁德交流道"
                },
                {
                    id: 5,
                    shortName: "平安返家",
                    time: "18:30",
                    name: "返抵竹南勝麗 A+ 溫暖的家",
                    category: "hotel",
                    categoryLabel: "平安返家",
                    desc: "回到熟悉的竹南市區，整理行李與相機照片，從容收心迎接新的一週。",
                    lat: 24.6865,
                    lng: 120.8754,
                    stay: "圓滿結束",
                    tips: "晚餐可於竹南家附近享用在地小吃",
                    mapsUrl: "https://www.google.com/maps/search/?api=1&query=苗栗縣竹南鎮"
                }
            ]
        }
    ],
    checklist: [
        {
            category: "🔥 核心預約與票券確認",
            items: [
                "Day 2 午餐餐廳預約（老新台菜 / 唐諾廚房 / 慢牛）",
                "Day 3 奇美博物館特展門票預約（建議 12:30 或 13:00）",
                "高雄巨蛋漢斯季默音樂會門票確認（實體票或電子票券）",
                "台南大員皇冠假日酒店訂房確認（IHG 會員價與景觀房）"
            ]
        },
        {
            category: "🚗 自駕與交通準備",
            items: [
                "確認車輛胎壓、油量與 eTag 餘額",
                "備妥手機磁吸車架與 Google Maps 離線地圖",
                "預備高雄捷運卡 / 一卡通（左營站停車轉乘使用）"
            ]
        },
        {
            category: "🎒 隨身裝備與衣物",
            items: [
                "輕便透氣衣物與音樂會正式/時尚休閒服裝",
                "相機、充電線、行動電源（巨蛋與奇美拍照必備）",
                "個人常備藥品、雨具（晴雨兩用傘）",
                "晨跑裝備（若計畫於大員皇冠水岸或漁光島晨跑）"
            ]
        },
        {
            category: "🍜 餐廳備案隨身包",
            items: [
                "Day 1 晚餐：彩豐樓粵菜 / 元素自助餐 / 文章牛肉湯 / 阿財牛肉湯",
                "Day 2 晚餐：弘記肉燥飯舖 / 和林拾麵 / 漢神巨蛋 B1 美饌街",
                "Day 3 午餐：阿裕牛肉崑崙店 / 輝哥本土牛肉爐（免排隊備案）",
                "Day 3 返家晚餐：詹師傅羊肉爐 / 十三棧麵食 / 英吉利海鮮 / 可口臭豆腐"
            ]
        }
    ]
};

