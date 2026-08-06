// 嘉義市政府文化局音樂廳 360 導覽 — 主資料檔
//
// 影像路徑、座位、heading 由 scripts/import-region.js 從各區的 nodes.json 帶入，
// 重跑會覆蓋；name、description、hotspots、boundaries 是人工維護的，不會被覆蓋。
//
// 修改後請執行：
//   node scripts/generate-tour.js     產生頁面並驗證資料

export const TOUR = {
  "venue": {
    "name": "嘉義市政府文化局音樂廳",
    "address": "嘉義市東區忠孝路 275 號",
    "seats": {
      "total": 961,
      "sellable": 951,
      "floor1": 705,
      "floor2": 256
    },
    "acoustics": {
      "reverbWithoutShell": 1.49,
      "reverbWithShell": 1.65,
      "note": "殘響時間為無觀眾時測值，單位秒"
    },
    "stage": {
      "type": "鏡框式",
      "prosceniumWidth": 17.42,
      "prosceniumHeight": 7.79,
      "stageHeight": 1.245,
      "floorMaterial": "丹麥櫸木平口拼花地板",
      "apronToFirstRow": 5.42,
      "apronToLastRow": 26.5
    },
    "sourceDocs": "嘉義市政府文化局場地技術資料（舞台／音響／燈光／懸吊系統）"
  },
  "imageBase": "https://img.cysh.band/hall-tour/",
  "regions": [
    {
      "id": "lobby",
      "name": "音樂廳前廳",
      "order": 1,
      "status": "ready",
      "photoCount": 33,
      "sourcePhotos": 33,
      "nodes": [
        {
          "id": "lob-01",
          "name": "前廳 01 一樓服務臺",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/lob-01-preview.webp",
            "mid": "pano/lob-01-mid.webp",
            "full": "pano/lob-01-full.webp"
          },
          "source": "CAM_20260805100936_0066_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3448,
            "y": 0.8957
          },
          "links": [
            {
              "to": "lob-08",
              "yaw": 111.75,
              "pitch": -21.72
            },
            {
              "to": "lob-02",
              "yaw": 192.8,
              "pitch": -31.02
            },
            {
              "to": "lob-07",
              "yaw": 158.82,
              "pitch": -16.55
            }
          ]
        },
        {
          "id": "lob-02",
          "name": "前廳 02",
          "floor": "1F",
          "heading": 85,
          "images": {
            "preview": "pano/lob-02-preview.webp",
            "mid": "pano/lob-02-mid.webp",
            "full": "pano/lob-02-full.webp"
          },
          "source": "CAM_20260805100949_0067_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.4119,
            "y": 0.8957
          },
          "links": [
            {
              "to": "lob-01",
              "yaw": 359.09,
              "pitch": -23.51
            },
            {
              "to": "lob-08",
              "yaw": 58.43,
              "pitch": -23.45
            },
            {
              "to": "lob-07",
              "yaw": 123.99,
              "pitch": -25.19
            },
            {
              "to": "lob-03",
              "yaw": 177.45,
              "pitch": -32.84
            }
          ]
        },
        {
          "id": "lob-03",
          "name": "前廳 03",
          "floor": "1F",
          "heading": 101,
          "images": {
            "preview": "pano/lob-03-preview.webp",
            "mid": "pano/lob-03-mid.webp",
            "full": "pano/lob-03-full.webp"
          },
          "source": "CAM_20260805101003_0068_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.4958,
            "y": 0.8957
          },
          "links": [
            {
              "to": "lob-07",
              "yaw": 97.94,
              "pitch": -21.48
            },
            {
              "to": "lob-06",
              "yaw": 161.51,
              "pitch": -19.35
            },
            {
              "to": "lob-04",
              "yaw": 189.23,
              "pitch": -23.28
            },
            {
              "to": "lob-08",
              "yaw": 36.01,
              "pitch": -16.7
            },
            {
              "to": "lob-02",
              "yaw": 3.81,
              "pitch": -23.39
            }
          ]
        },
        {
          "id": "lob-04",
          "name": "前廳 04",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/lob-04-preview.webp",
            "mid": "pano/lob-04-mid.webp",
            "full": "pano/lob-04-full.webp"
          },
          "source": "CAM_20260805101018_0069_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.5797,
            "y": 0.8957
          },
          "links": [
            {
              "to": "lob-05",
              "yaw": 178.5,
              "pitch": -31.85
            },
            {
              "to": "lob-06",
              "yaw": 104.79,
              "pitch": -30.03
            },
            {
              "to": "lob-07",
              "yaw": 35.16,
              "pitch": -20.25
            },
            {
              "to": "lob-03",
              "yaw": 351.09,
              "pitch": -20.14
            }
          ]
        },
        {
          "id": "lob-05",
          "name": "前廳 05",
          "floor": "1F",
          "heading": 90,
          "images": {
            "preview": "pano/lob-05-preview.webp",
            "mid": "pano/lob-05-mid.webp",
            "full": "pano/lob-05-full.webp"
          },
          "source": "CAM_20260805101035_0070_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6518,
            "y": 0.8957
          },
          "links": [
            {
              "to": "lob-06",
              "yaw": 47.63,
              "pitch": -23.73
            },
            {
              "to": "lob-04",
              "yaw": 347.36,
              "pitch": -28.39
            }
          ]
        },
        {
          "id": "lob-06",
          "name": "前廳 06",
          "floor": "1F",
          "heading": 87,
          "images": {
            "preview": "pano/lob-06-preview.webp",
            "mid": "pano/lob-06-mid.webp",
            "full": "pano/lob-06-full.webp"
          },
          "source": "CAM_20260805101105_0071_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6133,
            "y": 0.8428
          },
          "links": [
            {
              "to": "lob-11",
              "yaw": 97.46,
              "pitch": -22.52
            },
            {
              "to": "lob-10",
              "yaw": 41.3,
              "pitch": -18.04
            },
            {
              "to": "lob-07",
              "yaw": 353.03,
              "pitch": -23.84
            },
            {
              "to": "lob-03",
              "yaw": 320.2,
              "pitch": -20.03
            },
            {
              "to": "lob-04",
              "yaw": 272.51,
              "pitch": -26.92
            },
            {
              "to": "lob-05",
              "yaw": 219.02,
              "pitch": -22.61
            }
          ]
        },
        {
          "id": "lob-07",
          "name": "前廳 07",
          "floor": "1F",
          "heading": 85,
          "images": {
            "preview": "pano/lob-07-preview.webp",
            "mid": "pano/lob-07-mid.webp",
            "full": "pano/lob-07-full.webp"
          },
          "source": "CAM_20260805101126_0072_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.521,
            "y": 0.8417
          },
          "links": [
            {
              "to": "lob-10",
              "yaw": 82.33,
              "pitch": -21.57
            },
            {
              "to": "lob-11",
              "yaw": 132.07,
              "pitch": -14.85
            },
            {
              "to": "lob-06",
              "yaw": 169.61,
              "pitch": -18.39
            },
            {
              "to": "lob-04",
              "yaw": 209.18,
              "pitch": -18.78
            },
            {
              "to": "lob-03",
              "yaw": 267.93,
              "pitch": -31.13
            },
            {
              "to": "lob-02",
              "yaw": 322.87,
              "pitch": -21.06
            },
            {
              "to": "lob-08",
              "yaw": 352.24,
              "pitch": -17.83
            },
            {
              "to": "lob-09",
              "yaw": 33.69,
              "pitch": -15.4
            }
          ]
        },
        {
          "id": "lob-08",
          "name": "前廳 08",
          "floor": "1F",
          "heading": 94,
          "images": {
            "preview": "pano/lob-08-preview.webp",
            "mid": "pano/lob-08-mid.webp",
            "full": "pano/lob-08-full.webp"
          },
          "source": "CAM_20260805101142_0073_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3985,
            "y": 0.8405
          },
          "links": [
            {
              "to": "lob-09",
              "yaw": 84.11,
              "pitch": -18.2
            },
            {
              "to": "lob-10",
              "yaw": 129.39,
              "pitch": -15.94
            },
            {
              "to": "lob-11",
              "yaw": 159.95,
              "pitch": -9.98
            },
            {
              "to": "lob-07",
              "yaw": 184.41,
              "pitch": -24.31
            },
            {
              "to": "lob-03",
              "yaw": 227.7,
              "pitch": -19.2
            },
            {
              "to": "lob-02",
              "yaw": 285.02,
              "pitch": -26.78
            },
            {
              "to": "lob-01",
              "yaw": 325.23,
              "pitch": -24.18
            }
          ]
        },
        {
          "id": "lob-09",
          "name": "前廳 09",
          "floor": "1F",
          "heading": 91,
          "images": {
            "preview": "pano/lob-09-preview.webp",
            "mid": "pano/lob-09-mid.webp",
            "full": "pano/lob-09-full.webp"
          },
          "source": "CAM_20260805101158_0074_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3968,
            "y": 0.7647
          },
          "links": [
            {
              "to": "lob-18",
              "yaw": 52.62,
              "pitch": -10.3
            },
            {
              "to": "lob-17",
              "yaw": 78.45,
              "pitch": -10.44
            },
            {
              "to": "lob-10",
              "yaw": 180.65,
              "pitch": -28.92
            },
            {
              "to": "lob-07",
              "yaw": 224.94,
              "pitch": -22.27
            },
            {
              "to": "lob-08",
              "yaw": 283.81,
              "pitch": -23.15
            }
          ]
        },
        {
          "id": "lob-10",
          "name": "前廳 10",
          "floor": "1F",
          "heading": 85,
          "images": {
            "preview": "pano/lob-10-preview.webp",
            "mid": "pano/lob-10-mid.webp",
            "full": "pano/lob-10-full.webp"
          },
          "source": "CAM_20260805101214_0075_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.4941,
            "y": 0.7658
          },
          "links": [
            {
              "to": "lob-12",
              "yaw": 129.12,
              "pitch": -12.43
            },
            {
              "to": "lob-11",
              "yaw": 173.76,
              "pitch": -19.4
            },
            {
              "to": "lob-06",
              "yaw": 213.41,
              "pitch": -16.94
            },
            {
              "to": "lob-07",
              "yaw": 264.88,
              "pitch": -28.22
            },
            {
              "to": "lob-08",
              "yaw": 323.56,
              "pitch": -17.31
            },
            {
              "to": "lob-09",
              "yaw": 358.14,
              "pitch": -19.92
            },
            {
              "to": "lob-18",
              "yaw": 31.75,
              "pitch": -6.24
            }
          ]
        },
        {
          "id": "lob-11",
          "name": "前廳 11",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/lob-11-preview.webp",
            "mid": "pano/lob-11-mid.webp",
            "full": "pano/lob-11-full.webp"
          },
          "source": "CAM_20260805101230_0076_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.5914,
            "y": 0.7647
          },
          "links": [
            {
              "to": "lob-12",
              "yaw": 112.47,
              "pitch": -15.81
            },
            {
              "to": "lob-06",
              "yaw": 260.15,
              "pitch": -23.48
            },
            {
              "to": "lob-07",
              "yaw": 315.81,
              "pitch": -20.88
            },
            {
              "to": "lob-10",
              "yaw": 2.83,
              "pitch": -22.22
            }
          ]
        },
        {
          "id": "lob-12",
          "name": "前廳 12",
          "floor": "1F",
          "heading": 82,
          "images": {
            "preview": "pano/lob-12-preview.webp",
            "mid": "pano/lob-12-mid.webp",
            "full": "pano/lob-12-full.webp"
          },
          "source": "CAM_20260805101357_0077_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6065,
            "y": 0.7233
          },
          "links": [
            {
              "to": "lob-15",
              "yaw": 52.46,
              "pitch": -24.1
            },
            {
              "to": "lob-13",
              "yaw": 124.4,
              "pitch": -18.54
            },
            {
              "to": "lob-10",
              "yaw": 331.14,
              "pitch": -14.39
            },
            {
              "to": "lob-11",
              "yaw": 279.52,
              "pitch": -23.63
            },
            {
              "to": "lob-07",
              "yaw": 295.85,
              "pitch": -9.98
            }
          ]
        },
        {
          "id": "lob-13",
          "name": "前廳 13",
          "floor": "1F",
          "heading": 82,
          "images": {
            "preview": "pano/lob-13-preview.webp",
            "mid": "pano/lob-13-mid.webp",
            "full": "pano/lob-13-full.webp"
          },
          "source": "CAM_20260805101414_0078_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.677,
            "y": 0.6945
          },
          "links": [
            {
              "to": "lob-14",
              "yaw": 134.71,
              "pitch": -22.07
            },
            {
              "to": "lob-15",
              "yaw": 354.15,
              "pitch": -20.96
            },
            {
              "to": "lob-12",
              "yaw": 299.73,
              "pitch": -20.55
            }
          ]
        },
        {
          "id": "lob-14",
          "name": "前廳 14 女廁",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/lob-14-preview.webp",
            "mid": "pano/lob-14-mid.webp",
            "full": "pano/lob-14-full.webp"
          },
          "source": "CAM_20260805101437_0079_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.7391,
            "y": 0.6554
          },
          "links": [
            {
              "to": "lob-13",
              "yaw": 312.32,
              "pitch": -32.56
            }
          ]
        },
        {
          "id": "lob-15",
          "name": "前廳 15",
          "floor": "1F",
          "heading": 87,
          "images": {
            "preview": "pano/lob-15-preview.webp",
            "mid": "pano/lob-15-mid.webp",
            "full": "pano/lob-15-full.webp"
          },
          "source": "CAM_20260805101456_0080_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.5629,
            "y": 0.6888
          },
          "links": [
            {
              "to": "lob-16",
              "yaw": 0.7,
              "pitch": -27.97
            },
            {
              "to": "lob-12",
              "yaw": 237.77,
              "pitch": -31.52
            },
            {
              "to": "lob-13",
              "yaw": 172.89,
              "pitch": -20.35
            }
          ]
        },
        {
          "id": "lob-16",
          "name": "前廳 16 廁所",
          "floor": "1F",
          "heading": 94,
          "images": {
            "preview": "pano/lob-16-preview.webp",
            "mid": "pano/lob-16-mid.webp",
            "full": "pano/lob-16-full.webp"
          },
          "source": "CAM_20260805101513_0081_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.5008,
            "y": 0.6773
          },
          "links": [
            {
              "to": "lob-15",
              "yaw": 185.68,
              "pitch": -20.86
            },
            {
              "to": "lob-17",
              "yaw": 1.49,
              "pitch": -19.65
            }
          ]
        },
        {
          "id": "lob-17",
          "name": "前廳 17",
          "floor": "1F",
          "heading": 102,
          "images": {
            "preview": "pano/lob-17-preview.webp",
            "mid": "pano/lob-17-mid.webp",
            "full": "pano/lob-17-full.webp"
          },
          "source": "CAM_20260805101547_0082_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.432,
            "y": 0.6911
          },
          "links": [
            {
              "to": "lob-16",
              "yaw": 181.64,
              "pitch": -29.21
            },
            {
              "to": "lob-18",
              "yaw": 357.82,
              "pitch": -10.98
            },
            {
              "to": "lob-09",
              "yaw": 274.26,
              "pitch": -12.74
            }
          ]
        },
        {
          "id": "lob-18",
          "name": "前廳 18",
          "floor": "1F",
          "heading": 97,
          "images": {
            "preview": "pano/lob-18-preview.webp",
            "mid": "pano/lob-18-mid.webp",
            "full": "pano/lob-18-full.webp"
          },
          "source": "CAM_20260805101608_0083_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.2911,
            "y": 0.6934
          },
          "links": [
            {
              "to": "lob-17",
              "yaw": 201.12,
              "pitch": -19.54
            },
            {
              "to": "lob-19",
              "yaw": 9.36,
              "pitch": -13.46
            }
          ]
        },
        {
          "id": "lob-19",
          "name": "前廳 19",
          "floor": "1F",
          "heading": 355,
          "images": {
            "preview": "pano/lob-19-preview.webp",
            "mid": "pano/lob-19-mid.webp",
            "full": "pano/lob-19-full.webp"
          },
          "source": "CAM_20260805101627_0084_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.2005,
            "y": 0.6911
          },
          "links": [
            {
              "to": "lob-18",
              "yaw": 82.2,
              "pitch": -22.36
            },
            {
              "to": "lob-20",
              "yaw": 186.59,
              "pitch": -11.51
            }
          ]
        },
        {
          "id": "lob-20",
          "name": "前廳 20",
          "floor": "1F",
          "heading": 353,
          "images": {
            "preview": "pano/lob-20-preview.webp",
            "mid": "pano/lob-20-mid.webp",
            "full": "pano/lob-20-full.webp"
          },
          "source": "CAM_20260805101652_0085_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1904,
            "y": 0.7827
          },
          "links": [
            {
              "to": "lob-19",
              "yaw": 348.52,
              "pitch": -14.14
            }
          ]
        },
        {
          "id": "lob-21",
          "name": "前廳 21",
          "floor": "2F",
          "heading": 101,
          "images": {
            "preview": "pano/lob-21-preview.webp",
            "mid": "pano/lob-21-mid.webp",
            "full": "pano/lob-21-full.webp"
          },
          "source": "CAM_20260805101913_0086_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3482,
            "y": 0.8325
          },
          "links": [
            {
              "to": "lob-22",
              "yaw": 108.71,
              "pitch": 6
            }
          ]
        },
        {
          "id": "lob-22",
          "name": "前廳 22",
          "floor": "2F",
          "heading": 70,
          "images": {
            "preview": "pano/lob-22-preview.webp",
            "mid": "pano/lob-22-mid.webp",
            "full": "pano/lob-22-full.webp"
          },
          "source": "CAM_20260805101931_0087_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3733,
            "y": 0.7658
          },
          "links": [
            {
              "to": "lob-26",
              "yaw": 131.81,
              "pitch": -24.27
            },
            {
              "to": "lob-25",
              "yaw": 52.7,
              "pitch": -29.58
            },
            {
              "to": "lob-24",
              "yaw": 19.7,
              "pitch": -19.58
            }
          ]
        },
        {
          "id": "lob-23",
          "name": "前廳 23",
          "floor": "2F",
          "heading": 106,
          "images": {
            "preview": "pano/lob-23-preview.webp",
            "mid": "pano/lob-23-mid.webp",
            "full": "pano/lob-23-full.webp"
          },
          "source": "CAM_20260805101955_0088_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.2156,
            "y": 0.7083
          },
          "links": [
            {
              "to": "lob-24",
              "yaw": 198.35,
              "pitch": -32.63
            }
          ]
        },
        {
          "id": "lob-24",
          "name": "前廳 24",
          "floor": "2F",
          "heading": 81,
          "images": {
            "preview": "pano/lob-24-preview.webp",
            "mid": "pano/lob-24-mid.webp",
            "full": "pano/lob-24-full.webp"
          },
          "source": "CAM_20260805102015_0089_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.2928,
            "y": 0.7187
          },
          "links": [
            {
              "to": "lob-25",
              "yaw": 177.73,
              "pitch": -25.05
            },
            {
              "to": "lob-22",
              "yaw": 213.4,
              "pitch": -14.84
            },
            {
              "to": "lob-23",
              "yaw": 9.17,
              "pitch": -27.62
            }
          ]
        },
        {
          "id": "lob-25",
          "name": "前廳 25",
          "floor": "2F",
          "heading": 94,
          "images": {
            "preview": "pano/lob-25-preview.webp",
            "mid": "pano/lob-25-mid.webp",
            "full": "pano/lob-25-full.webp"
          },
          "source": "CAM_20260805102027_0090_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3515,
            "y": 0.7267
          },
          "links": [
            {
              "to": "aud-19",
              "yaw": 113.36,
              "pitch": -10.24
            },
            {
              "to": "lob-24",
              "yaw": 2.53,
              "pitch": -25.95
            },
            {
              "to": "lob-22",
              "yaw": 248.34,
              "pitch": -26.51
            },
            {
              "to": "lob-26",
              "yaw": 185.93,
              "pitch": -22.13
            }
          ]
        },
        {
          "id": "lob-26",
          "name": "前廳 26",
          "floor": "2F",
          "heading": 95,
          "images": {
            "preview": "pano/lob-26-preview.webp",
            "mid": "pano/lob-26-mid.webp",
            "full": "pano/lob-26-full.webp"
          },
          "source": "CAM_20260805102048_0091_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.4153,
            "y": 0.7313
          },
          "links": [
            {
              "to": "lob-25",
              "yaw": 3.46,
              "pitch": -19.85
            },
            {
              "to": "lob-22",
              "yaw": 316.17,
              "pitch": -22.02
            },
            {
              "to": "lob-27",
              "yaw": 179.34,
              "pitch": -26.64
            }
          ]
        },
        {
          "id": "lob-27",
          "name": "前廳 27",
          "floor": "2F",
          "heading": 89,
          "images": {
            "preview": "pano/lob-27-preview.webp",
            "mid": "pano/lob-27-mid.webp",
            "full": "pano/lob-27-full.webp"
          },
          "source": "CAM_20260805102103_0092_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.4958,
            "y": 0.7325
          },
          "links": [
            {
              "to": "lob-26",
              "yaw": 353.79,
              "pitch": -27.27
            },
            {
              "to": "lob-28",
              "yaw": 177.36,
              "pitch": -30.7
            }
          ]
        },
        {
          "id": "lob-28",
          "name": "前廳 28",
          "floor": "2F",
          "heading": 99,
          "images": {
            "preview": "pano/lob-28-preview.webp",
            "mid": "pano/lob-28-mid.webp",
            "full": "pano/lob-28-full.webp"
          },
          "source": "CAM_20260805102119_0093_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.5646,
            "y": 0.7325
          },
          "links": [
            {
              "to": "lob-29",
              "yaw": 170.73,
              "pitch": -27.09
            },
            {
              "to": "lob-32",
              "yaw": 234.6,
              "pitch": -30.96
            },
            {
              "to": "lob-27",
              "yaw": 0.01,
              "pitch": -23.09
            }
          ]
        },
        {
          "id": "lob-29",
          "name": "前廳 29",
          "floor": "2F",
          "heading": 83,
          "images": {
            "preview": "pano/lob-29-preview.webp",
            "mid": "pano/lob-29-mid.webp",
            "full": "pano/lob-29-full.webp"
          },
          "source": "CAM_20260805102134_0094_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6535,
            "y": 0.7221
          },
          "links": [
            {
              "to": "aud-21",
              "yaw": 58.04,
              "pitch": -6.13
            },
            {
              "to": "lob-30",
              "yaw": 164.49,
              "pitch": -33.41
            },
            {
              "to": "lob-32",
              "yaw": 286.64,
              "pitch": -24.31
            },
            {
              "to": "lob-28",
              "yaw": 344.67,
              "pitch": -24.42
            }
          ]
        },
        {
          "id": "lob-30",
          "name": "前廳 30",
          "floor": "2F",
          "heading": 91,
          "images": {
            "preview": "pano/lob-30-preview.webp",
            "mid": "pano/lob-30-mid.webp",
            "full": "pano/lob-30-full.webp"
          },
          "source": "CAM_20260805102154_0095_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.7441,
            "y": 0.7072
          },
          "links": [
            {
              "to": "lob-31",
              "yaw": 135.49,
              "pitch": -31.44
            },
            {
              "to": "lob-29",
              "yaw": 356.21,
              "pitch": -20.46
            },
            {
              "to": "lob-32",
              "yaw": 326.38,
              "pitch": -12.45
            }
          ]
        },
        {
          "id": "lob-31",
          "name": "前廳 31",
          "floor": "2F",
          "heading": 100,
          "images": {
            "preview": "pano/lob-31-preview.webp",
            "mid": "pano/lob-31-mid.webp",
            "full": "pano/lob-31-full.webp"
          },
          "source": "CAM_20260805102208_0096_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8129,
            "y": 0.6945
          },
          "links": [
            {
              "to": "lob-30",
              "yaw": 0.14,
              "pitch": -24.5
            }
          ]
        },
        {
          "id": "lob-32",
          "name": "前廳 32",
          "floor": "2F",
          "heading": 92,
          "images": {
            "preview": "pano/lob-32-preview.webp",
            "mid": "pano/lob-32-mid.webp",
            "full": "pano/lob-32-full.webp"
          },
          "source": "CAM_20260805102228_0097_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6418,
            "y": 0.7681
          },
          "links": [
            {
              "to": "lob-29",
              "yaw": 89.14,
              "pitch": -26.63
            },
            {
              "to": "lob-30",
              "yaw": 140.99,
              "pitch": -16.97
            },
            {
              "to": "lob-28",
              "yaw": 31.86,
              "pitch": -27.64
            },
            {
              "to": "lob-33",
              "yaw": 253.61,
              "pitch": -35.81
            }
          ]
        },
        {
          "id": "lob-33",
          "name": "前廳 33",
          "floor": "2F",
          "heading": 68,
          "images": {
            "preview": "pano/lob-33-preview.webp",
            "mid": "pano/lob-33-mid.webp",
            "full": "pano/lob-33-full.webp"
          },
          "source": "CAM_20260805102255_0098_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6552,
            "y": 0.829
          },
          "links": [
            {
              "to": "lob-32",
              "yaw": 60.02,
              "pitch": 5.99
            }
          ]
        }
      ],
      "boundaries": [
        {
          "node": "lob-25",
          "to": "auditorium",
          "toNode": "aud-19",
          "label": "三號門　進入觀眾席"
        },
        {
          "node": "lob-29",
          "to": "auditorium",
          "toNode": "aud-21",
          "label": "四號門　進入觀眾席"
        }
      ],
      "updatedAt": "2026-08-06"
    },
    {
      "id": "auditorium",
      "name": "觀眾席",
      "order": 2,
      "status": "ready",
      "photoCount": 22,
      "sourcePhotos": 22,
      "nodes": [
        {
          "id": "aud-01",
          "name": "一樓最前排左外側",
          "floor": "1F",
          "heading": 265,
          "images": {
            "preview": "pano/aud-01-preview.webp",
            "mid": "pano/aud-01-mid.webp",
            "full": "pano/aud-01-full.webp"
          },
          "source": "CAM_20260805095834_0044_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-1-29",
          "links": [
            {
              "to": "aud-02",
              "yaw": 5.58,
              "pitch": -11.73
            },
            {
              "to": "aud-07",
              "yaw": 80.57,
              "pitch": -0.07
            },
            {
              "to": "aud-08",
              "yaw": 109.96,
              "pitch": 0.56
            },
            {
              "to": "aud-06",
              "yaw": 34.92,
              "pitch": -0.69
            }
          ]
        },
        {
          "id": "aud-02",
          "name": "一樓最前排中央",
          "floor": "1F",
          "heading": 273,
          "images": {
            "preview": "pano/aud-02-preview.webp",
            "mid": "pano/aud-02-mid.webp",
            "full": "pano/aud-02-full.webp"
          },
          "source": "CAM_20260805095856_0045_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-1-1",
          "links": [
            {
              "to": "aud-01",
              "yaw": 188.65,
              "pitch": -8.89
            },
            {
              "to": "aud-07",
              "yaw": 127.87,
              "pitch": 2.81
            },
            {
              "to": "aud-06",
              "yaw": 90.58,
              "pitch": 1.11
            },
            {
              "to": "aud-05",
              "yaw": 42.48,
              "pitch": 0.59
            },
            {
              "to": "aud-04",
              "yaw": 358.66,
              "pitch": -11.91
            }
          ]
        },
        {
          "id": "aud-03",
          "name": "一樓最前排右側",
          "floor": "1F",
          "heading": 275,
          "images": {
            "preview": "pano/aud-03-preview.webp",
            "mid": "pano/aud-03-mid.webp",
            "full": "pano/aud-03-full.webp"
          },
          "source": "CAM_20260805095915_0046_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-1-22",
          "links": [
            {
              "to": "aud-02",
              "yaw": 179.18,
              "pitch": -12.82
            },
            {
              "to": "aud-06",
              "yaw": 133.16,
              "pitch": 1.4
            },
            {
              "to": "aud-05",
              "yaw": 95.24,
              "pitch": 1.21
            },
            {
              "to": "aud-04",
              "yaw": 63.3,
              "pitch": 1.49
            }
          ]
        },
        {
          "id": "aud-04",
          "name": "一樓前段右外側",
          "floor": "1F",
          "heading": 288,
          "images": {
            "preview": "pano/aud-04-preview.webp",
            "mid": "pano/aud-04-mid.webp",
            "full": "pano/aud-04-full.webp"
          },
          "source": "CAM_20260805095945_0047_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-9-32",
          "links": [
            {
              "to": "aud-03",
              "yaw": 249.22,
              "pitch": -15.64
            },
            {
              "to": "aud-05",
              "yaw": 171.63,
              "pitch": -17.99
            },
            {
              "to": "aud-12",
              "yaw": 136.07,
              "pitch": -0.88
            },
            {
              "to": "aud-13",
              "yaw": 91.84,
              "pitch": -4.81
            }
          ]
        },
        {
          "id": "aud-05",
          "name": "一樓前段右側",
          "floor": "1F",
          "heading": 273,
          "images": {
            "preview": "pano/aud-05-preview.webp",
            "mid": "pano/aud-05-mid.webp",
            "full": "pano/aud-05-full.webp"
          },
          "source": "CAM_20260805100006_0048_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-9-20",
          "links": [
            {
              "to": "aud-03",
              "yaw": 267.21,
              "pitch": -16.73
            },
            {
              "to": "aud-02",
              "yaw": 220.8,
              "pitch": -12.51
            },
            {
              "to": "aud-06",
              "yaw": 165.49,
              "pitch": -10.49
            },
            {
              "to": "aud-11",
              "yaw": 138.41,
              "pitch": -1.32
            },
            {
              "to": "aud-12",
              "yaw": 84.72,
              "pitch": -3.55
            },
            {
              "to": "aud-13",
              "yaw": 30.36,
              "pitch": -1.08
            },
            {
              "to": "aud-04",
              "yaw": 342.83,
              "pitch": -13.97
            }
          ]
        },
        {
          "id": "aud-06",
          "name": "一樓前段中央",
          "floor": "1F",
          "heading": 264,
          "images": {
            "preview": "pano/aud-06-preview.webp",
            "mid": "pano/aud-06-mid.webp",
            "full": "pano/aud-06-full.webp"
          },
          "source": "CAM_20260805100029_0049_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-9-1",
          "links": [
            {
              "to": "aud-02",
              "yaw": 268.23,
              "pitch": -15.33
            },
            {
              "to": "aud-03",
              "yaw": 309.6,
              "pitch": -9.79
            },
            {
              "to": "aud-05",
              "yaw": 351.72,
              "pitch": -9.59
            },
            {
              "to": "aud-12",
              "yaw": 25.93,
              "pitch": 0.39
            },
            {
              "to": "aud-11",
              "yaw": 84.24,
              "pitch": -2.03
            },
            {
              "to": "aud-10",
              "yaw": 146.96,
              "pitch": -0.72
            },
            {
              "to": "aud-07",
              "yaw": 178.95,
              "pitch": -10.64
            },
            {
              "to": "aud-01",
              "yaw": 226.64,
              "pitch": -11.31
            }
          ]
        },
        {
          "id": "aud-07",
          "name": "一樓前段左側",
          "floor": "1F",
          "heading": 247,
          "images": {
            "preview": "pano/aud-07-preview.webp",
            "mid": "pano/aud-07-mid.webp",
            "full": "pano/aud-07-full.webp"
          },
          "source": "CAM_20260805100050_0050_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-9-21",
          "links": [
            {
              "to": "aud-01",
              "yaw": 250.29,
              "pitch": -13.88
            },
            {
              "to": "aud-02",
              "yaw": 305.62,
              "pitch": -11.92
            },
            {
              "to": "aud-06",
              "yaw": 0.32,
              "pitch": -9.59
            },
            {
              "to": "aud-11",
              "yaw": 31.12,
              "pitch": -0.94
            },
            {
              "to": "aud-10",
              "yaw": 85.29,
              "pitch": -1.71
            },
            {
              "to": "aud-09",
              "yaw": 134.3,
              "pitch": -1.61
            },
            {
              "to": "aud-08",
              "yaw": 183.81,
              "pitch": -14.51
            }
          ]
        },
        {
          "id": "aud-08",
          "name": "一樓前段左外側",
          "floor": "1F",
          "heading": 240,
          "images": {
            "preview": "pano/aud-08-preview.webp",
            "mid": "pano/aud-08-mid.webp",
            "full": "pano/aud-08-full.webp"
          },
          "source": "CAM_20260805100111_0051_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-9-33",
          "links": [
            {
              "to": "aud-01",
              "yaw": 279.6,
              "pitch": -15.34
            },
            {
              "to": "aud-02",
              "yaw": 318.64,
              "pitch": -8.85
            },
            {
              "to": "aud-07",
              "yaw": 6.88,
              "pitch": -14.18
            },
            {
              "to": "aud-10",
              "yaw": 39.29,
              "pitch": -1.34
            },
            {
              "to": "aud-09",
              "yaw": 80.22,
              "pitch": -4.99
            }
          ]
        },
        {
          "id": "aud-09",
          "name": "一樓中段左外側",
          "floor": "1F",
          "heading": 262,
          "images": {
            "preview": "pano/aud-09-preview.webp",
            "mid": "pano/aud-09-mid.webp",
            "full": "pano/aud-09-full.webp"
          },
          "source": "CAM_20260805100152_0052_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-13-33",
          "links": [
            {
              "to": "aud-08",
              "yaw": 270.43,
              "pitch": -21.31
            },
            {
              "to": "aud-07",
              "yaw": 321.23,
              "pitch": -17.17
            },
            {
              "to": "aud-10",
              "yaw": 18.22,
              "pitch": -15.29
            },
            {
              "to": "aud-17",
              "yaw": 51.99,
              "pitch": -3.3
            },
            {
              "to": "aud-18",
              "yaw": 94.55,
              "pitch": -6.49
            }
          ]
        },
        {
          "id": "aud-10",
          "name": "一樓中段左側",
          "floor": "1F",
          "heading": 252,
          "images": {
            "preview": "pano/aud-10-preview.webp",
            "mid": "pano/aud-10-mid.webp",
            "full": "pano/aud-10-full.webp"
          },
          "source": "CAM_20260805100221_0053_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-13-21",
          "links": [
            {
              "to": "aud-07",
              "yaw": 260.59,
              "pitch": -22.76
            },
            {
              "to": "aud-06",
              "yaw": 323.29,
              "pitch": -12.78
            },
            {
              "to": "aud-11",
              "yaw": 2.51,
              "pitch": -10.12
            },
            {
              "to": "aud-16",
              "yaw": 23.58,
              "pitch": -5.47
            },
            {
              "to": "aud-17",
              "yaw": 83.72,
              "pitch": -7.43
            },
            {
              "to": "aud-18",
              "yaw": 141.05,
              "pitch": -4.02
            },
            {
              "to": "aud-09",
              "yaw": 182.46,
              "pitch": -13
            },
            {
              "to": "aud-08",
              "yaw": 218.56,
              "pitch": -14.52
            }
          ]
        },
        {
          "id": "aud-11",
          "name": "一樓中段中央",
          "floor": "1F",
          "heading": 270,
          "images": {
            "preview": "pano/aud-11-preview.webp",
            "mid": "pano/aud-11-mid.webp",
            "full": "pano/aud-11-full.webp"
          },
          "source": "CAM_20260805100239_0054_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-13-1",
          "links": [
            {
              "to": "aud-06",
              "yaw": 266.42,
              "pitch": -21.96
            },
            {
              "to": "aud-05",
              "yaw": 325.22,
              "pitch": -12.06
            },
            {
              "to": "aud-12",
              "yaw": 358.76,
              "pitch": -10.32
            },
            {
              "to": "aud-15",
              "yaw": 21.09,
              "pitch": -6.6
            },
            {
              "to": "aud-16",
              "yaw": 91.15,
              "pitch": -8.33
            },
            {
              "to": "aud-17",
              "yaw": 160.09,
              "pitch": -4.78
            },
            {
              "to": "aud-10",
              "yaw": 182.92,
              "pitch": -8.72
            },
            {
              "to": "aud-07",
              "yaw": 219.91,
              "pitch": -12.16
            }
          ]
        },
        {
          "id": "aud-12",
          "name": "一樓中段右側",
          "floor": "1F",
          "heading": 285,
          "images": {
            "preview": "pano/aud-12-preview.webp",
            "mid": "pano/aud-12-mid.webp",
            "full": "pano/aud-12-full.webp"
          },
          "source": "CAM_20260805100255_0055_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-13-20",
          "links": [
            {
              "to": "aud-05",
              "yaw": 280.19,
              "pitch": -21.18
            },
            {
              "to": "aud-04",
              "yaw": 317.27,
              "pitch": -15.61
            },
            {
              "to": "aud-13",
              "yaw": 0.34,
              "pitch": -15.21
            },
            {
              "to": "aud-14",
              "yaw": 44.63,
              "pitch": -6.04
            },
            {
              "to": "aud-15",
              "yaw": 107.18,
              "pitch": -6.8
            },
            {
              "to": "aud-16",
              "yaw": 162.23,
              "pitch": -4.14
            },
            {
              "to": "aud-11",
              "yaw": 184.04,
              "pitch": -8.33
            },
            {
              "to": "aud-06",
              "yaw": 211.88,
              "pitch": -10.82
            }
          ]
        },
        {
          "id": "aud-13",
          "name": "一樓中段右外側",
          "floor": "1F",
          "heading": 276,
          "images": {
            "preview": "pano/aud-13-preview.webp",
            "mid": "pano/aud-13-mid.webp",
            "full": "pano/aud-13-full.webp"
          },
          "source": "CAM_20260805100308_0056_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-13-32",
          "links": [
            {
              "to": "aud-04",
              "yaw": 282.35,
              "pitch": -22.61
            },
            {
              "to": "aud-14",
              "yaw": 100.49,
              "pitch": -6.6
            },
            {
              "to": "aud-15",
              "yaw": 145.8,
              "pitch": -4.03
            },
            {
              "to": "aud-12",
              "yaw": 174.48,
              "pitch": -12.96
            },
            {
              "to": "aud-05",
              "yaw": 221.48,
              "pitch": -18.33
            }
          ]
        },
        {
          "id": "aud-14",
          "name": "一樓中後段右外側",
          "floor": "1F",
          "heading": 277,
          "images": {
            "preview": "pano/aud-14-preview.webp",
            "mid": "pano/aud-14-mid.webp",
            "full": "pano/aud-14-full.webp"
          },
          "source": "CAM_20260805100330_0057_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-16-34",
          "links": [
            {
              "to": "aud-13",
              "yaw": 274.59,
              "pitch": -22.08
            },
            {
              "to": "aud-12",
              "yaw": 224.22,
              "pitch": -15.99
            },
            {
              "to": "aud-15",
              "yaw": 169.44,
              "pitch": -14.02
            },
            {
              "to": "aud-21",
              "yaw": 130.58,
              "pitch": 1.45
            }
          ]
        },
        {
          "id": "aud-15",
          "name": "一樓中後段右側",
          "floor": "1F",
          "heading": 287,
          "images": {
            "preview": "pano/aud-15-preview.webp",
            "mid": "pano/aud-15-mid.webp",
            "full": "pano/aud-15-full.webp"
          },
          "source": "CAM_20260805100352_0058_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-16-22",
          "links": [
            {
              "to": "aud-12",
              "yaw": 278.4,
              "pitch": -19.84
            },
            {
              "to": "aud-13",
              "yaw": 315.78,
              "pitch": -13.1
            },
            {
              "to": "aud-14",
              "yaw": 359.33,
              "pitch": -13.45
            },
            {
              "to": "aud-21",
              "yaw": 97.21,
              "pitch": 2.13
            },
            {
              "to": "aud-20",
              "yaw": 151.18,
              "pitch": 1.79
            },
            {
              "to": "aud-16",
              "yaw": 184.81,
              "pitch": -9.63
            },
            {
              "to": "aud-11",
              "yaw": 218.8,
              "pitch": -12.81
            }
          ]
        },
        {
          "id": "aud-16",
          "name": "一樓中後段中央",
          "floor": "1F",
          "heading": 273,
          "images": {
            "preview": "pano/aud-16-preview.webp",
            "mid": "pano/aud-16-mid.webp",
            "full": "pano/aud-16-full.webp"
          },
          "source": "CAM_20260805100417_0059_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-16-1",
          "links": [
            {
              "to": "aud-11",
              "yaw": 275.95,
              "pitch": -19.42
            },
            {
              "to": "aud-12",
              "yaw": 326.91,
              "pitch": -10.26
            },
            {
              "to": "aud-15",
              "yaw": 358.44,
              "pitch": -8.72
            },
            {
              "to": "aud-21",
              "yaw": 31.08,
              "pitch": 1.19
            },
            {
              "to": "aud-20",
              "yaw": 87.52,
              "pitch": 4.22
            },
            {
              "to": "aud-19",
              "yaw": 150.31,
              "pitch": 2.19
            },
            {
              "to": "aud-17",
              "yaw": 187.41,
              "pitch": -8.71
            },
            {
              "to": "aud-10",
              "yaw": 219.85,
              "pitch": -13.5
            }
          ]
        },
        {
          "id": "aud-17",
          "name": "一樓中後段左側",
          "floor": "1F",
          "heading": 260,
          "images": {
            "preview": "pano/aud-17-preview.webp",
            "mid": "pano/aud-17-mid.webp",
            "full": "pano/aud-17-full.webp"
          },
          "source": "CAM_20260805100439_0060_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-16-21",
          "links": [
            {
              "to": "aud-10",
              "yaw": 258.65,
              "pitch": -21.76
            },
            {
              "to": "aud-11",
              "yaw": 319.43,
              "pitch": -13.49
            },
            {
              "to": "aud-16",
              "yaw": 356.58,
              "pitch": -11.42
            },
            {
              "to": "aud-20",
              "yaw": 30.55,
              "pitch": 1.21
            },
            {
              "to": "aud-19",
              "yaw": 85.15,
              "pitch": 3.29
            },
            {
              "to": "aud-18",
              "yaw": 180.32,
              "pitch": -13.56
            },
            {
              "to": "aud-09",
              "yaw": 220.32,
              "pitch": -14.02
            }
          ]
        },
        {
          "id": "aud-18",
          "name": "一樓中後段左外側",
          "floor": "1F",
          "heading": 259,
          "images": {
            "preview": "pano/aud-18-preview.webp",
            "mid": "pano/aud-18-mid.webp",
            "full": "pano/aud-18-full.webp"
          },
          "source": "CAM_20260805100458_0061_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-16-33",
          "links": [
            {
              "to": "aud-09",
              "yaw": 269.53,
              "pitch": -19.29
            },
            {
              "to": "aud-10",
              "yaw": 318.99,
              "pitch": -17.02
            },
            {
              "to": "aud-17",
              "yaw": 11.23,
              "pitch": -13.58
            },
            {
              "to": "aud-19",
              "yaw": 53.95,
              "pitch": 3.3
            }
          ]
        },
        {
          "id": "aud-19",
          "name": "一樓最後排左側",
          "floor": "1F",
          "heading": 277,
          "images": {
            "preview": "pano/aud-19-preview.webp",
            "mid": "pano/aud-19-mid.webp",
            "full": "pano/aud-19-full.webp"
          },
          "source": "CAM_20260805100526_0062_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-20-19",
          "links": [
            {
              "to": "aud-18",
              "yaw": 230.42,
              "pitch": -16.15
            },
            {
              "to": "aud-17",
              "yaw": 270.65,
              "pitch": -24.21
            },
            {
              "to": "aud-16",
              "yaw": 328.75,
              "pitch": -16.02
            },
            {
              "to": "aud-20",
              "yaw": 11.56,
              "pitch": -9.55
            }
          ]
        },
        {
          "id": "aud-20",
          "name": "一樓最後排中央",
          "floor": "1F",
          "heading": 268,
          "images": {
            "preview": "pano/aud-20-preview.webp",
            "mid": "pano/aud-20-mid.webp",
            "full": "pano/aud-20-full.webp"
          },
          "source": "CAM_20260805100555_0063_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-20-1",
          "links": [
            {
              "to": "aud-16",
              "yaw": 264.34,
              "pitch": -27.08
            },
            {
              "to": "aud-15",
              "yaw": 324.48,
              "pitch": -13.15
            },
            {
              "to": "aud-21",
              "yaw": 358.33,
              "pitch": -9.2
            },
            {
              "to": "aud-17",
              "yaw": 208.92,
              "pitch": -12.68
            },
            {
              "to": "aud-19",
              "yaw": 177.8,
              "pitch": -7.3
            }
          ]
        },
        {
          "id": "aud-21",
          "name": "一樓最後排右側",
          "floor": "1F",
          "heading": 285,
          "images": {
            "preview": "pano/aud-21-preview.webp",
            "mid": "pano/aud-21-mid.webp",
            "full": "pano/aud-21-full.webp"
          },
          "source": "CAM_20260805100621_0064_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "1F-20-18",
          "links": [
            {
              "to": "aud-14",
              "yaw": 327.65,
              "pitch": -16.78
            },
            {
              "to": "aud-15",
              "yaw": 281.89,
              "pitch": -26.09
            },
            {
              "to": "aud-16",
              "yaw": 221.62,
              "pitch": -13.52
            },
            {
              "to": "aud-20",
              "yaw": 180.76,
              "pitch": -7.27
            }
          ]
        },
        {
          "id": "aud-22",
          "name": "二樓側面高處",
          "floor": "2F",
          "heading": 225,
          "images": {
            "preview": "pano/aud-22-preview.webp",
            "mid": "pano/aud-22-mid.webp",
            "full": "pano/aud-22-full.webp"
          },
          "source": "CAM_20260805100737_0065_D.JPG",
          "description": "",
          "hotspots": [],
          "seat": "2F-1-37",
          "links": [
            {
              "to": "aud-01",
              "yaw": 273.25,
              "pitch": -26.28
            },
            {
              "to": "aud-02",
              "yaw": 300.04,
              "pitch": -22.71
            },
            {
              "to": "aud-03",
              "yaw": 313.19,
              "pitch": -17.16
            },
            {
              "to": "aud-05",
              "yaw": 331.54,
              "pitch": -17.83
            }
          ]
        }
      ],
      "boundaries": [
        {
          "node": "aud-19",
          "to": "lobby",
          "toNode": "lob-25",
          "label": "三號門　回到前廳"
        },
        {
          "node": "aud-21",
          "to": "lobby",
          "toNode": "lob-29",
          "label": "四號門　回到前廳"
        }
      ],
      "updatedAt": "2026-08-06"
    },
    {
      "id": "stage",
      "name": "舞台",
      "order": 3,
      "status": "planned",
      "photoCount": 0,
      "sourcePhotos": 22,
      "nodes": [],
      "boundaries": []
    },
    {
      "id": "backstage",
      "name": "後台入口",
      "order": 4,
      "status": "planned",
      "photoCount": 0,
      "sourcePhotos": 6,
      "nodes": [],
      "boundaries": []
    },
    {
      "id": "greenroom",
      "name": "地下室休息室",
      "order": 5,
      "status": "ready",
      "photoCount": 28,
      "sourcePhotos": 28,
      "nodes": [
        {
          "id": "gre-01",
          "name": "地下室休息室 01",
          "floor": "B1",
          "heading": 178,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-01-preview.webp",
            "mid": "pano/gre-01-mid.webp",
            "full": "pano/gre-01-full.webp"
          },
          "source": "CAM_20260805103038_0105_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.0622,
            "y": 0.0985
          },
          "links": [
            {
              "to": "gre-02",
              "yaw": 91.79,
              "pitch": -39.4
            }
          ]
        },
        {
          "id": "gre-02",
          "name": "地下室休息室 02",
          "floor": "B1",
          "heading": 5,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-02-preview.webp",
            "mid": "pano/gre-02-mid.webp",
            "full": "pano/gre-02-full.webp"
          },
          "source": "CAM_20260805103059_0106_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1279,
            "y": 0.1016
          },
          "links": [
            {
              "to": "gre-03",
              "yaw": 81.3,
              "pitch": -22.84
            }
          ]
        },
        {
          "id": "gre-03",
          "name": "地下室休息室 03",
          "floor": "B1",
          "heading": 90,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-03-preview.webp",
            "mid": "pano/gre-03-mid.webp",
            "full": "pano/gre-03-full.webp"
          },
          "source": "CAM_20260805103112_0107_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1936,
            "y": 0.1078
          },
          "links": [
            {
              "to": "gre-14",
              "yaw": 176.54,
              "pitch": -22.62
            },
            {
              "to": "gre-04",
              "yaw": 271.37,
              "pitch": -18.91
            },
            {
              "to": "gre-09",
              "yaw": 271.71,
              "pitch": -8.32
            }
          ]
        },
        {
          "id": "gre-04",
          "name": "地下室休息室 04",
          "floor": "B1",
          "heading": 95,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-04-preview.webp",
            "mid": "pano/gre-04-mid.webp",
            "full": "pano/gre-04-full.webp"
          },
          "source": "CAM_20260805103131_0108_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1889,
            "y": 0.436
          },
          "links": [
            {
              "to": "gre-03",
              "yaw": 95.87,
              "pitch": -16.17
            },
            {
              "to": "gre-12",
              "yaw": 125.92,
              "pitch": -20.77
            },
            {
              "to": "gre-07",
              "yaw": 355.64,
              "pitch": -21.08
            },
            {
              "to": "gre-06",
              "yaw": 22.65,
              "pitch": -24.84
            },
            {
              "to": "gre-09",
              "yaw": 280.66,
              "pitch": -13.96
            }
          ]
        },
        {
          "id": "gre-05",
          "name": "地下室休息室 05",
          "floor": "B1",
          "heading": 5,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-05-preview.webp",
            "mid": "pano/gre-05-mid.webp",
            "full": "pano/gre-05-full.webp"
          },
          "source": "CAM_20260805103208_0109_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.0637,
            "y": 0.3486
          },
          "links": [
            {
              "to": "gre-06",
              "yaw": 183.41,
              "pitch": -42.25
            }
          ]
        },
        {
          "id": "gre-06",
          "name": "地下室休息室 06",
          "floor": "B1",
          "heading": 0,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-06-preview.webp",
            "mid": "pano/gre-06-mid.webp",
            "full": "pano/gre-06-full.webp"
          },
          "source": "CAM_20260805103230_0110_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1279,
            "y": 0.3517
          },
          "links": [
            {
              "to": "gre-04",
              "yaw": 29.29,
              "pitch": -24.75
            },
            {
              "to": "gre-07",
              "yaw": 119.86,
              "pitch": -40.2
            }
          ]
        },
        {
          "id": "gre-07",
          "name": "地下室休息室 07",
          "floor": "B1",
          "heading": 9,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-07-preview.webp",
            "mid": "pano/gre-07-mid.webp",
            "full": "pano/gre-07-full.webp"
          },
          "source": "CAM_20260805103246_0111_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1295,
            "y": 0.4985
          },
          "links": [
            {
              "to": "gre-04",
              "yaw": 55.84,
              "pitch": -24.56
            },
            {
              "to": "gre-06",
              "yaw": 37.13,
              "pitch": -30.43
            },
            {
              "to": "gre-08",
              "yaw": 143.13,
              "pitch": -42.44
            }
          ]
        },
        {
          "id": "gre-08",
          "name": "地下室休息室 08",
          "floor": "B1",
          "heading": 0,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-08-preview.webp",
            "mid": "pano/gre-08-mid.webp",
            "full": "pano/gre-08-full.webp"
          },
          "source": "CAM_20260805103311_0112_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.0528,
            "y": 0.5237
          },
          "links": [
            {
              "to": "gre-07",
              "yaw": 257.34,
              "pitch": -48.46
            }
          ]
        },
        {
          "id": "gre-09",
          "name": "地下室休息室 09",
          "floor": "B1",
          "heading": 276,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-09-preview.webp",
            "mid": "pano/gre-09-mid.webp",
            "full": "pano/gre-09-full.webp"
          },
          "source": "CAM_20260805103333_0113_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.1952,
            "y": 0.733
          },
          "links": [
            {
              "to": "gre-10",
              "yaw": 181.85,
              "pitch": -24.75
            },
            {
              "to": "gre-04",
              "yaw": 277.52,
              "pitch": -12.88
            }
          ]
        },
        {
          "id": "gre-10",
          "name": "地下室休息室 10",
          "floor": "B1",
          "heading": 10,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-10-preview.webp",
            "mid": "pano/gre-10-mid.webp",
            "full": "pano/gre-10-full.webp"
          },
          "source": "CAM_20260805103347_0114_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.131,
            "y": 0.6736
          },
          "links": [
            {
              "to": "gre-11",
              "yaw": 318.95,
              "pitch": -33.55
            },
            {
              "to": "gre-09",
              "yaw": 95.53,
              "pitch": -26.54
            }
          ]
        },
        {
          "id": "gre-11",
          "name": "地下室休息室 11",
          "floor": "B1",
          "heading": 0,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-11-preview.webp",
            "mid": "pano/gre-11-mid.webp",
            "full": "pano/gre-11-full.webp"
          },
          "source": "CAM_20260805103359_0115_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.0637,
            "y": 0.6769
          },
          "links": [
            {
              "to": "gre-10",
              "yaw": 134.65,
              "pitch": -30.15
            }
          ]
        },
        {
          "id": "gre-12",
          "name": "地下室休息室 12",
          "floor": "B1",
          "heading": 125,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-12-preview.webp",
            "mid": "pano/gre-12-mid.webp",
            "full": "pano/gre-12-full.webp"
          },
          "source": "CAM_20260805103429_0116_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.2609,
            "y": 0.3672
          },
          "links": [
            {
              "to": "gre-03",
              "yaw": 76.55,
              "pitch": -16.68
            },
            {
              "to": "gre-04",
              "yaw": 52.74,
              "pitch": -28.75
            }
          ]
        },
        {
          "id": "gre-13",
          "name": "地下室休息室 13",
          "floor": "B1",
          "heading": 100,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-13-preview.webp",
            "mid": "pano/gre-13-mid.webp",
            "full": "pano/gre-13-full.webp"
          },
          "source": "CAM_20260805103444_0117_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3282,
            "y": 0.3735
          },
          "links": [
            {
              "to": "gre-12",
              "yaw": 21.21,
              "pitch": -28.2
            }
          ]
        },
        {
          "id": "gre-14",
          "name": "地下室休息室 14",
          "floor": "B1",
          "heading": 278,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-14-preview.webp",
            "mid": "pano/gre-14-mid.webp",
            "full": "pano/gre-14-full.webp"
          },
          "source": "CAM_20260805103506_0118_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3016,
            "y": 0.1047
          },
          "links": [
            {
              "to": "gre-15",
              "yaw": 19.12,
              "pitch": -16.97
            },
            {
              "to": "gre-03",
              "yaw": 190.57,
              "pitch": -17.18
            },
            {
              "to": "gre-02",
              "yaw": 197.84,
              "pitch": -8.48
            }
          ]
        },
        {
          "id": "gre-15",
          "name": "地下室休息室 15",
          "floor": "B1",
          "heading": 0,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-15-preview.webp",
            "mid": "pano/gre-15-mid.webp",
            "full": "pano/gre-15-full.webp"
          },
          "source": "CAM_20260805103526_0119_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.3861,
            "y": 0.1016
          },
          "links": [
            {
              "to": "gre-16",
              "yaw": 0.52,
              "pitch": -8.26
            },
            {
              "to": "gre-14",
              "yaw": 197.99,
              "pitch": -15.45
            },
            {
              "to": "gre-03",
              "yaw": 185.97,
              "pitch": -9.19
            }
          ]
        },
        {
          "id": "gre-16",
          "name": "地下室休息室 16",
          "floor": "B1",
          "heading": 264,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-16-preview.webp",
            "mid": "pano/gre-16-mid.webp",
            "full": "pano/gre-16-full.webp"
          },
          "source": "CAM_20260805103606_0120_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.6286,
            "y": 0.1422
          },
          "links": [
            {
              "to": "gre-17",
              "yaw": 334.81,
              "pitch": -11.81
            },
            {
              "to": "gre-15",
              "yaw": 176.14,
              "pitch": -7.21
            }
          ]
        },
        {
          "id": "gre-17",
          "name": "地下室休息室 17",
          "floor": "B1",
          "heading": 267,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-17-preview.webp",
            "mid": "pano/gre-17-mid.webp",
            "full": "pano/gre-17-full.webp"
          },
          "source": "CAM_20260805103626_0121_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.7225,
            "y": 0.1453
          },
          "links": [
            {
              "to": "gre-16",
              "yaw": 163.11,
              "pitch": -12.95
            },
            {
              "to": "gre-18",
              "yaw": 16.08,
              "pitch": -22.27
            },
            {
              "to": "gre-25",
              "yaw": 350.85,
              "pitch": -12.41
            },
            {
              "to": "gre-19",
              "yaw": 22.71,
              "pitch": -10.39
            }
          ]
        },
        {
          "id": "gre-18",
          "name": "地下室休息室 18",
          "floor": "B1",
          "heading": 261,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-18-preview.webp",
            "mid": "pano/gre-18-mid.webp",
            "full": "pano/gre-18-full.webp"
          },
          "source": "CAM_20260805103640_0122_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8116,
            "y": 0.2109
          },
          "links": [
            {
              "to": "gre-17",
              "yaw": 195.36,
              "pitch": -28.28
            },
            {
              "to": "gre-16",
              "yaw": 177.21,
              "pitch": -8.44
            },
            {
              "to": "gre-25",
              "yaw": 305.19,
              "pitch": -27.38
            },
            {
              "to": "gre-19",
              "yaw": 35.75,
              "pitch": -24.24
            },
            {
              "to": "gre-20",
              "yaw": 84.79,
              "pitch": -16.11
            },
            {
              "to": "gre-24",
              "yaw": 83.31,
              "pitch": -7.87
            }
          ]
        },
        {
          "id": "gre-19",
          "name": "地下室休息室 19",
          "floor": "B1",
          "heading": 359,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-19-preview.webp",
            "mid": "pano/gre-19-mid.webp",
            "full": "pano/gre-19-full.webp"
          },
          "source": "CAM_20260805103655_0123_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8899,
            "y": 0.3204
          },
          "links": [
            {
              "to": "gre-18",
              "yaw": 309.63,
              "pitch": -21.92
            }
          ]
        },
        {
          "id": "gre-20",
          "name": "地下室休息室 20",
          "floor": "B1",
          "heading": 357,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-20-preview.webp",
            "mid": "pano/gre-20-mid.webp",
            "full": "pano/gre-20-full.webp"
          },
          "source": "CAM_20260805103710_0124_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8304,
            "y": 0.533
          },
          "links": [
            {
              "to": "gre-18",
              "yaw": 348.97,
              "pitch": -11.88
            },
            {
              "to": "gre-19",
              "yaw": 17.42,
              "pitch": -16.33
            },
            {
              "to": "gre-25",
              "yaw": 7.64,
              "pitch": -9.91
            },
            {
              "to": "gre-21",
              "yaw": 74.34,
              "pitch": -28.91
            },
            {
              "to": "gre-22",
              "yaw": 116.24,
              "pitch": -23.02
            },
            {
              "to": "gre-24",
              "yaw": 175.81,
              "pitch": -15.18
            }
          ]
        },
        {
          "id": "gre-21",
          "name": "地下室休息室 21",
          "floor": "B1",
          "heading": 358,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-21-preview.webp",
            "mid": "pano/gre-21-mid.webp",
            "full": "pano/gre-21-full.webp"
          },
          "source": "CAM_20260805103722_0125_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8946,
            "y": 0.5111
          },
          "links": [
            {
              "to": "gre-20",
              "yaw": 255.29,
              "pitch": -24.88
            }
          ]
        },
        {
          "id": "gre-22",
          "name": "地下室休息室 22",
          "floor": "B1",
          "heading": 347,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-22-preview.webp",
            "mid": "pano/gre-22-mid.webp",
            "full": "pano/gre-22-full.webp"
          },
          "source": "CAM_20260805103737_0126_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8914,
            "y": 0.6674
          },
          "links": [
            {
              "to": "gre-20",
              "yaw": 295.39,
              "pitch": -21.96
            }
          ]
        },
        {
          "id": "gre-23",
          "name": "地下室休息室 23",
          "floor": "B1",
          "heading": 353,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-23-preview.webp",
            "mid": "pano/gre-23-mid.webp",
            "full": "pano/gre-23-full.webp"
          },
          "source": "CAM_20260805103751_0127_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8946,
            "y": 0.8425
          },
          "links": [
            {
              "to": "gre-24",
              "yaw": 229.27,
              "pitch": -27.08
            }
          ]
        },
        {
          "id": "gre-24",
          "name": "地下室休息室 24",
          "floor": "B1",
          "heading": 98,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-24-preview.webp",
            "mid": "pano/gre-24-mid.webp",
            "full": "pano/gre-24-full.webp"
          },
          "source": "CAM_20260805103802_0128_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8179,
            "y": 0.8456
          },
          "links": [
            {
              "to": "gre-23",
              "yaw": 196.04,
              "pitch": -31.27
            },
            {
              "to": "gre-22",
              "yaw": 123.13,
              "pitch": -17.54
            },
            {
              "to": "gre-20",
              "yaw": 96.22,
              "pitch": -18.26
            },
            {
              "to": "gre-18",
              "yaw": 95.81,
              "pitch": -7.03
            },
            {
              "to": "gre-21",
              "yaw": 113.83,
              "pitch": -12.73
            }
          ]
        },
        {
          "id": "gre-25",
          "name": "地下室休息室 25",
          "floor": "B1",
          "heading": 163,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-25-preview.webp",
            "mid": "pano/gre-25-mid.webp",
            "full": "pano/gre-25-full.webp"
          },
          "source": "CAM_20260805103856_0129_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.8914,
            "y": 0.0859
          },
          "links": [
            {
              "to": "gre-18",
              "yaw": 61.59,
              "pitch": -24.15
            },
            {
              "to": "gre-17",
              "yaw": 66.91,
              "pitch": -6.69
            },
            {
              "to": "gre-26",
              "yaw": 271.02,
              "pitch": 9.37
            }
          ]
        },
        {
          "id": "gre-26",
          "name": "地下室休息室 26",
          "floor": "B1",
          "heading": 176,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-26-preview.webp",
            "mid": "pano/gre-26-mid.webp",
            "full": "pano/gre-26-full.webp"
          },
          "source": "CAM_20260805103920_0130_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.9493,
            "y": 0.0828
          },
          "links": [
            {
              "to": "gre-25",
              "yaw": 83.05,
              "pitch": -36.42
            },
            {
              "to": "gre-27",
              "yaw": 103.12,
              "pitch": 9.53
            }
          ]
        },
        {
          "id": "gre-27",
          "name": "地下室休息室 27",
          "floor": "B1",
          "heading": 190,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-27-preview.webp",
            "mid": "pano/gre-27-mid.webp",
            "full": "pano/gre-27-full.webp"
          },
          "source": "CAM_20260805103943_0131_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.9618,
            "y": 0.2141
          },
          "links": [
            {
              "to": "gre-28",
              "yaw": 80.24,
              "pitch": -21.38
            },
            {
              "to": "gre-26",
              "yaw": 283.38,
              "pitch": -33.61
            }
          ]
        },
        {
          "id": "gre-28",
          "name": "地下室休息室 28",
          "floor": "B1",
          "heading": 0,
          "headingConfirmed": true,
          "images": {
            "preview": "pano/gre-28-preview.webp",
            "mid": "pano/gre-28-mid.webp",
            "full": "pano/gre-28-full.webp"
          },
          "source": "CAM_20260805103959_0132_D.JPG",
          "description": "",
          "hotspots": [],
          "plan": {
            "x": 0.7741,
            "y": 0.0702
          },
          "links": [
            {
              "to": "gre-27",
              "yaw": 285.9,
              "pitch": -15.11
            }
          ]
        }
      ],
      "boundaries": [],
      "updatedAt": "2026-08-06"
    }
  ]
};
