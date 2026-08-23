// 由 hall-tour-editor 工作區產生；正式套用前仍需處理 staging-manifest.json 的警告。
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
  "sceneMenu": [
    {
      "id": "lobby-1f",
      "name": "音樂廳前廳一樓",
      "regionId": "lobby",
      "floor": "1F",
      "startNode": "lob-03",
      "image": "scene-cards/lobby-1f.webp",
      "status": "ready"
    },
    {
      "id": "lobby-2f",
      "name": "音樂廳前廳二樓",
      "regionId": "lobby",
      "floor": "2F",
      "startNode": "lob-22",
      "image": "scene-cards/lobby-2f.webp",
      "status": "ready"
    },
    {
      "id": "auditorium-1f",
      "name": "觀眾席一樓",
      "regionId": "auditorium",
      "floor": "1F",
      "startNode": "aud-011",
      "image": "scene-cards/20260823-v1/auditorium-1f.webp",
      "status": "ready"
    },
    {
      "id": "auditorium-2f",
      "name": "觀眾席二樓",
      "regionId": "auditorium",
      "floor": "2F",
      "startNode": "aud-048",
      "image": "scene-cards/20260823-v1/auditorium-2f.webp",
      "status": "ready"
    },
    {
      "id": "stage",
      "name": "舞台與貴賓室",
      "regionId": "stage",
      "image": "scene-cards/20260823-v1/stage.webp",
      "status": "ready",
      "startNode": "stg-010",
      "floor": "1F"
    },
    {
      "id": "greenroom",
      "name": "演出團隊休息區",
      "regionId": "greenroom",
      "floor": "B1",
      "startNode": "gre-002",
      "image": "scene-cards/20260823-v1/greenroom.webp",
      "status": "ready"
    }
  ],
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
            },
            {
              "to": "lob-03",
              "yaw": 190.04,
              "pitch": -14.65
            },
            {
              "to": "lob-10",
              "yaw": 125.75,
              "pitch": -9.62
            },
            {
              "to": "lob-21",
              "yaw": 78.8,
              "pitch": -3.89
            },
            {
              "to": "lob-22",
              "yaw": 86.07,
              "pitch": 10.6
            },
            {
              "to": "lob-33",
              "yaw": 156.24,
              "pitch": -0.74
            },
            {
              "to": "lob-32",
              "yaw": 138.08,
              "pitch": 8.98
            },
            {
              "to": "lob-04",
              "yaw": 181.03,
              "pitch": -8.39
            },
            {
              "to": "lob-06",
              "yaw": 166.54,
              "pitch": -8.13
            },
            {
              "to": "lob-11",
              "yaw": 145.74,
              "pitch": -7
            },
            {
              "to": "lob-12",
              "yaw": 136.02,
              "pitch": -3.96
            },
            {
              "to": "lob-16",
              "yaw": 115.7,
              "pitch": 11.26
            }
          ],
          "plan": {
            "x": 0.3466,
            "y": 0.8959
          }
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
            },
            {
              "to": "lob-09",
              "yaw": 69.62,
              "pitch": -11.75
            },
            {
              "to": "lob-10",
              "yaw": 106,
              "pitch": -12.41
            },
            {
              "to": "lob-11",
              "yaw": 130.51,
              "pitch": -8
            },
            {
              "to": "lob-04",
              "yaw": 176.24,
              "pitch": -16.41
            },
            {
              "to": "lob-33",
              "yaw": 146.14,
              "pitch": -0.77
            },
            {
              "to": "lob-32",
              "yaw": 125.17,
              "pitch": 8.46
            },
            {
              "to": "lob-22",
              "yaw": 68.68,
              "pitch": 10.51
            },
            {
              "to": "lob-21",
              "yaw": 48.63,
              "pitch": -2.61
            }
          ],
          "plan": {
            "x": 0.4119,
            "y": 0.8957
          }
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
            },
            {
              "to": "lob-10",
              "yaw": 98.78,
              "pitch": -10
            },
            {
              "to": "lob-09",
              "yaw": 65.18,
              "pitch": -10.01
            },
            {
              "to": "lob-18",
              "yaw": 71,
              "pitch": -1.74
            },
            {
              "to": "lob-12",
              "yaw": 123.61,
              "pitch": -4.58
            },
            {
              "to": "lob-11",
              "yaw": 132.95,
              "pitch": -10.76
            },
            {
              "to": "lob-05",
              "yaw": 188.41,
              "pitch": -11.56
            },
            {
              "to": "lob-01",
              "yaw": 13.39,
              "pitch": -12.19
            },
            {
              "to": "lob-33",
              "yaw": 152.01,
              "pitch": -1.27
            },
            {
              "to": "lob-32",
              "yaw": 129.7,
              "pitch": 10.36
            },
            {
              "to": "lob-22",
              "yaw": 68.3,
              "pitch": 10.27
            },
            {
              "to": "lob-21",
              "yaw": 45.66,
              "pitch": 0.07
            }
          ],
          "plan": {
            "x": 0.4958,
            "y": 0.8957
          }
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
            },
            {
              "to": "lob-10",
              "yaw": 60.47,
              "pitch": -11.08
            },
            {
              "to": "lob-09",
              "yaw": 37.6,
              "pitch": -7.25
            },
            {
              "to": "lob-11",
              "yaw": 93.77,
              "pitch": -12.38
            },
            {
              "to": "lob-18",
              "yaw": 46.28,
              "pitch": -1.08
            },
            {
              "to": "lob-02",
              "yaw": 353.15,
              "pitch": -11.43
            },
            {
              "to": "lob-21",
              "yaw": 26.14,
              "pitch": -0.87
            },
            {
              "to": "lob-22",
              "yaw": 45.36,
              "pitch": 9.79
            },
            {
              "to": "lob-33",
              "yaw": 120.06,
              "pitch": -1.97
            },
            {
              "to": "lob-32",
              "yaw": 100.51,
              "pitch": 12.11
            },
            {
              "to": "lob-27",
              "yaw": 71.22,
              "pitch": 12.48
            }
          ],
          "plan": {
            "x": 0.5797,
            "y": 0.8957
          }
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
            },
            {
              "to": "lob-03",
              "yaw": 350.33,
              "pitch": -12.1
            },
            {
              "to": "lob-07",
              "yaw": 17.58,
              "pitch": -12.51
            },
            {
              "to": "lob-10",
              "yaw": 46.4,
              "pitch": -7.98
            },
            {
              "to": "lob-09",
              "yaw": 25.4,
              "pitch": -6.25
            },
            {
              "to": "lob-08",
              "yaw": 8.56,
              "pitch": -6.09
            },
            {
              "to": "lob-01",
              "yaw": 356.02,
              "pitch": -5.38
            },
            {
              "to": "lob-18",
              "yaw": 36.07,
              "pitch": -0.53
            },
            {
              "to": "lob-33",
              "yaw": 87.15,
              "pitch": -2.7
            },
            {
              "to": "lob-32",
              "yaw": 85.35,
              "pitch": 11.25
            },
            {
              "to": "lob-27",
              "yaw": 58.78,
              "pitch": 10.87
            },
            {
              "to": "lob-21",
              "yaw": 20.22,
              "pitch": 0.56
            },
            {
              "to": "lob-22",
              "yaw": 35.95,
              "pitch": 7.95
            }
          ],
          "plan": {
            "x": 0.6518,
            "y": 0.8957
          }
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
            },
            {
              "to": "lob-12",
              "yaw": 95.62,
              "pitch": -9.37
            },
            {
              "to": "lob-02",
              "yaw": 329.46,
              "pitch": -13.59
            },
            {
              "to": "lob-01",
              "yaw": 337.69,
              "pitch": -8.49
            },
            {
              "to": "lob-08",
              "yaw": 354.59,
              "pitch": -10.22
            },
            {
              "to": "lob-09",
              "yaw": 20.63,
              "pitch": -9.27
            },
            {
              "to": "lob-18",
              "yaw": 35.16,
              "pitch": -2.87
            },
            {
              "to": "lob-33",
              "yaw": 142.69,
              "pitch": -3.03
            },
            {
              "to": "lob-32",
              "yaw": 101.26,
              "pitch": 15.02
            },
            {
              "to": "lob-22",
              "yaw": 32.46,
              "pitch": 10.67
            },
            {
              "to": "lob-21",
              "yaw": 10.17,
              "pitch": -0.9
            }
          ],
          "plan": {
            "x": 0.6133,
            "y": 0.8428
          }
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
            },
            {
              "to": "lob-12",
              "yaw": 119.36,
              "pitch": -6.36
            },
            {
              "to": "lob-18",
              "yaw": 42.18,
              "pitch": -3.53
            },
            {
              "to": "lob-01",
              "yaw": 334.65,
              "pitch": -13.24
            },
            {
              "to": "lob-05",
              "yaw": 195.1,
              "pitch": -10.8
            },
            {
              "to": "lob-33",
              "yaw": 151.53,
              "pitch": -1.61
            },
            {
              "to": "lob-32",
              "yaw": 121.29,
              "pitch": 12.99
            },
            {
              "to": "lob-21",
              "yaw": 15.63,
              "pitch": -0.88
            },
            {
              "to": "lob-22",
              "yaw": 47.28,
              "pitch": 13.03
            }
          ],
          "plan": {
            "x": 0.521,
            "y": 0.8417
          }
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
            },
            {
              "to": "lob-04",
              "yaw": 209.8,
              "pitch": -11.97
            },
            {
              "to": "lob-05",
              "yaw": 198.06,
              "pitch": -6.5
            },
            {
              "to": "lob-06",
              "yaw": 184.22,
              "pitch": -10.66
            },
            {
              "to": "lob-12",
              "yaw": 143.28,
              "pitch": -2.97
            },
            {
              "to": "lob-18",
              "yaw": 76.98,
              "pitch": -5.63
            },
            {
              "to": "lob-21",
              "yaw": 33.51,
              "pitch": -3.12
            },
            {
              "to": "lob-22",
              "yaw": 75.93,
              "pitch": 15.29
            },
            {
              "to": "lob-33",
              "yaw": 169.91,
              "pitch": -0.32
            },
            {
              "to": "lob-32",
              "yaw": 147.52,
              "pitch": 10.39
            }
          ],
          "plan": {
            "x": 0.3985,
            "y": 0.8405
          }
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
            },
            {
              "to": "lob-03",
              "yaw": 246.45,
              "pitch": -10.82
            },
            {
              "to": "lob-02",
              "yaw": 276.87,
              "pitch": -12.79
            },
            {
              "to": "lob-04",
              "yaw": 228.34,
              "pitch": -9.71
            },
            {
              "to": "lob-05",
              "yaw": 212,
              "pitch": -6
            },
            {
              "to": "lob-06",
              "yaw": 201.85,
              "pitch": -11.27
            },
            {
              "to": "lob-11",
              "yaw": 180.14,
              "pitch": -11.41
            },
            {
              "to": "lob-12",
              "yaw": 156.63,
              "pitch": -7.05
            },
            {
              "to": "lob-33",
              "yaw": 186.04,
              "pitch": -0.15
            },
            {
              "to": "lob-32",
              "yaw": 157.7,
              "pitch": 14.42
            },
            {
              "to": "lob-22",
              "yaw": 64.73,
              "pitch": 25.98
            },
            {
              "to": "lob-21",
              "yaw": 355.48,
              "pitch": -3.36
            }
          ],
          "plan": {
            "x": 0.3968,
            "y": 0.7647
          }
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
            },
            {
              "to": "lob-04",
              "yaw": 230.57,
              "pitch": -11.66
            },
            {
              "to": "lob-03",
              "yaw": 264.16,
              "pitch": -13.83
            },
            {
              "to": "lob-02",
              "yaw": 295.59,
              "pitch": -12.84
            },
            {
              "to": "lob-01",
              "yaw": 313.54,
              "pitch": -9.06
            },
            {
              "to": "lob-21",
              "yaw": 350.22,
              "pitch": -1.97
            },
            {
              "to": "lob-22",
              "yaw": 30.04,
              "pitch": 16.57
            },
            {
              "to": "lob-32",
              "yaw": 140.03,
              "pitch": 17.86
            },
            {
              "to": "lob-33",
              "yaw": 180.91,
              "pitch": -1.53
            }
          ],
          "plan": {
            "x": 0.4941,
            "y": 0.7658
          }
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
            },
            {
              "to": "lob-18",
              "yaw": 25.31,
              "pitch": -3.9
            },
            {
              "to": "lob-08",
              "yaw": 338.56,
              "pitch": -9.4
            },
            {
              "to": "lob-09",
              "yaw": 3.4,
              "pitch": -9.62
            },
            {
              "to": "lob-03",
              "yaw": 294.26,
              "pitch": -11.56
            },
            {
              "to": "lob-02",
              "yaw": 317.8,
              "pitch": -9.29
            },
            {
              "to": "lob-01",
              "yaw": 328.94,
              "pitch": -6.51
            },
            {
              "to": "lob-04",
              "yaw": 266.4,
              "pitch": -13.13
            },
            {
              "to": "lob-33",
              "yaw": 185.23,
              "pitch": -4.56
            },
            {
              "to": "lob-32",
              "yaw": 117.87,
              "pitch": 26.62
            },
            {
              "to": "lob-22",
              "yaw": 21.92,
              "pitch": 12.57
            },
            {
              "to": "lob-21",
              "yaw": 356.44,
              "pitch": 0.03
            }
          ],
          "plan": {
            "x": 0.5914,
            "y": 0.7647
          }
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
              "yaw": 323.71,
              "pitch": -14.96
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
            },
            {
              "to": "lob-14",
              "yaw": 124.84,
              "pitch": -6.27
            },
            {
              "to": "lob-01",
              "yaw": 313.1,
              "pitch": -5.79
            },
            {
              "to": "lob-09",
              "yaw": 335.44,
              "pitch": -6.2
            }
          ],
          "plan": {
            "x": 0.6065,
            "y": 0.7233
          }
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
          ],
          "plan": {
            "x": 0.677,
            "y": 0.6945
          }
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
          "links": [
            {
              "to": "lob-13",
              "yaw": 312.32,
              "pitch": -32.56
            },
            {
              "to": "lob-12",
              "yaw": 314.23,
              "pitch": -12.27
            },
            {
              "to": "lob-10",
              "yaw": 320.19,
              "pitch": -5.95
            }
          ],
          "plan": {
            "x": 0.7391,
            "y": 0.6554
          }
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
            },
            {
              "to": "lob-11",
              "yaw": 256.62,
              "pitch": -14.22
            },
            {
              "to": "lob-17",
              "yaw": 1.48,
              "pitch": -10.89
            },
            {
              "to": "lob-18",
              "yaw": 3.98,
              "pitch": -4.64
            }
          ],
          "plan": {
            "x": 0.5629,
            "y": 0.6888
          }
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
            },
            {
              "to": "lob-12",
              "yaw": 194.65,
              "pitch": -10.6
            },
            {
              "to": "lob-13",
              "yaw": 177.37,
              "pitch": -7.81
            },
            {
              "to": "lob-18",
              "yaw": 8.35,
              "pitch": -8.79
            },
            {
              "to": "lob-19",
              "yaw": 7.73,
              "pitch": -2.23
            }
          ],
          "plan": {
            "x": 0.5008,
            "y": 0.6773
          }
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
            },
            {
              "to": "lob-15",
              "yaw": 179.12,
              "pitch": -15.49
            },
            {
              "to": "lob-13",
              "yaw": 176.96,
              "pitch": -10.13
            },
            {
              "to": "lob-08",
              "yaw": 270.5,
              "pitch": -3.85
            },
            {
              "to": "lob-19",
              "yaw": 5.83,
              "pitch": -1.65
            }
          ],
          "plan": {
            "x": 0.432,
            "y": 0.6911
          }
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
            },
            {
              "to": "lob-20",
              "yaw": 327.14,
              "pitch": -8.88
            },
            {
              "to": "lob-06",
              "yaw": 226.47,
              "pitch": -5.95
            },
            {
              "to": "lob-10",
              "yaw": 228.52,
              "pitch": -9.83
            },
            {
              "to": "lob-11",
              "yaw": 216.27,
              "pitch": -6.43
            },
            {
              "to": "lob-04",
              "yaw": 233.77,
              "pitch": -6.1
            }
          ],
          "plan": {
            "x": 0.2911,
            "y": 0.6934
          }
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
            },
            {
              "to": "lob-17",
              "yaw": 89.91,
              "pitch": -8.86
            },
            {
              "to": "lob-16",
              "yaw": 88.32,
              "pitch": -3.86
            },
            {
              "to": "lob-11",
              "yaw": 108.42,
              "pitch": -1.97
            }
          ],
          "plan": {
            "x": 0.2005,
            "y": 0.6911
          }
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
          "links": [
            {
              "to": "lob-19",
              "yaw": 348.52,
              "pitch": -14.14
            },
            {
              "to": "lob-18",
              "yaw": 31.16,
              "pitch": -12.76
            }
          ],
          "plan": {
            "x": 0.1904,
            "y": 0.7827
          }
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
          "links": [
            {
              "to": "lob-22",
              "yaw": 108.71,
              "pitch": 6
            },
            {
              "to": "lob-01",
              "yaw": 261.77,
              "pitch": -23.89
            },
            {
              "to": "lob-02",
              "yaw": 250.81,
              "pitch": -20.66
            },
            {
              "to": "lob-03",
              "yaw": 227.81,
              "pitch": -15.45
            },
            {
              "to": "lob-08",
              "yaw": 240.16,
              "pitch": -32.07
            },
            {
              "to": "lob-04",
              "yaw": 214.94,
              "pitch": -12.9
            },
            {
              "to": "lob-05",
              "yaw": 205.73,
              "pitch": -6.78
            },
            {
              "to": "lob-06",
              "yaw": 198.65,
              "pitch": -11.49
            },
            {
              "to": "lob-07",
              "yaw": 203.98,
              "pitch": -16.84
            },
            {
              "to": "lob-11",
              "yaw": 179.08,
              "pitch": -12.63
            },
            {
              "to": "lob-10",
              "yaw": 174.65,
              "pitch": -20.72
            },
            {
              "to": "lob-09",
              "yaw": 163.82,
              "pitch": -42.24
            },
            {
              "to": "lob-12",
              "yaw": 164.69,
              "pitch": -9.76
            },
            {
              "to": "lob-33",
              "yaw": 185.4,
              "pitch": -4.47
            },
            {
              "to": "lob-32",
              "yaw": 162.79,
              "pitch": 4.46
            },
            {
              "to": "aud-035",
              "yaw": 99.57,
              "pitch": 13.02
            }
          ],
          "plan": {
            "x": 0.3482,
            "y": 0.8325
          }
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
            },
            {
              "to": "lob-27",
              "yaw": 144.68,
              "pitch": -14.55
            },
            {
              "to": "lob-28",
              "yaw": 149.94,
              "pitch": -8.05
            },
            {
              "to": "lob-32",
              "yaw": 167.91,
              "pitch": -5.22
            },
            {
              "to": "lob-33",
              "yaw": 185.37,
              "pitch": -12.87
            },
            {
              "to": "lob-21",
              "yaw": 266.37,
              "pitch": -33.99
            },
            {
              "to": "lob-23",
              "yaw": 15.66,
              "pitch": -10.03
            },
            {
              "to": "lob-03",
              "yaw": 227.03,
              "pitch": -18.35
            },
            {
              "to": "lob-07",
              "yaw": 219.33,
              "pitch": -23.91
            },
            {
              "to": "lob-10",
              "yaw": 198.89,
              "pitch": -27.93
            },
            {
              "to": "lob-11",
              "yaw": 184.22,
              "pitch": -21.73
            },
            {
              "to": "lob-06",
              "yaw": 199.68,
              "pitch": -19.4
            },
            {
              "to": "lob-05",
              "yaw": 200.58,
              "pitch": -14.27
            },
            {
              "to": "lob-04",
              "yaw": 212.43,
              "pitch": -17.49
            },
            {
              "to": "lob-02",
              "yaw": 244.73,
              "pitch": -20.76
            },
            {
              "to": "lob-01",
              "yaw": 258.16,
              "pitch": -20.96
            },
            {
              "to": "lob-09",
              "yaw": 234.6,
              "pitch": -40.14
            },
            {
              "to": "aud-035",
              "yaw": 71.45,
              "pitch": -4.96
            }
          ],
          "plan": {
            "x": 0.3733,
            "y": 0.7658
          }
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
          "links": [
            {
              "to": "lob-24",
              "yaw": 198.35,
              "pitch": -32.63
            },
            {
              "to": "lob-25",
              "yaw": 203.66,
              "pitch": -12.64
            },
            {
              "to": "lob-22",
              "yaw": 221.67,
              "pitch": -9.17
            },
            {
              "to": "lob-26",
              "yaw": 204.38,
              "pitch": -7.36
            },
            {
              "to": "aud-035",
              "yaw": 185.35,
              "pitch": -2.84
            }
          ],
          "plan": {
            "x": 0.2156,
            "y": 0.7083
          }
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
            },
            {
              "to": "lob-26",
              "yaw": 177.11,
              "pitch": -13.75
            },
            {
              "to": "lob-27",
              "yaw": 175.83,
              "pitch": -7.06
            },
            {
              "to": "aud-035",
              "yaw": 142.44,
              "pitch": -5.71
            }
          ],
          "plan": {
            "x": 0.2928,
            "y": 0.7187
          }
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
          "links": [
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
          ],
          "plan": {
            "x": 0.3515,
            "y": 0.7267
          }
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
            },
            {
              "to": "lob-24",
              "yaw": 8.24,
              "pitch": -11.09
            },
            {
              "to": "lob-28",
              "yaw": 175.76,
              "pitch": -13.38
            },
            {
              "to": "lob-29",
              "yaw": 172.04,
              "pitch": -7.86
            },
            {
              "to": "lob-32",
              "yaw": 192.11,
              "pitch": -8.42
            }
          ],
          "plan": {
            "x": 0.4153,
            "y": 0.7313
          }
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
            },
            {
              "to": "lob-29",
              "yaw": 169.3,
              "pitch": -10.86
            },
            {
              "to": "lob-32",
              "yaw": 198.23,
              "pitch": -12.89
            },
            {
              "to": "lob-30",
              "yaw": 167.02,
              "pitch": -5.84
            },
            {
              "to": "lob-25",
              "yaw": 4.85,
              "pitch": -12.15
            },
            {
              "to": "lob-22",
              "yaw": 339.03,
              "pitch": -12.42
            },
            {
              "to": "lob-24",
              "yaw": 5.91,
              "pitch": -7.43
            }
          ],
          "plan": {
            "x": 0.4958,
            "y": 0.7325
          }
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
            },
            {
              "to": "lob-30",
              "yaw": 172.98,
              "pitch": -13.9
            },
            {
              "to": "lob-31",
              "yaw": 171.25,
              "pitch": -7.97
            },
            {
              "to": "lob-33",
              "yaw": 245.37,
              "pitch": -21.04
            },
            {
              "to": "lob-22",
              "yaw": 354.02,
              "pitch": -7.79
            },
            {
              "to": "lob-26",
              "yaw": 7.65,
              "pitch": -11.89
            },
            {
              "to": "lob-25",
              "yaw": 10.82,
              "pitch": -6.83
            }
          ],
          "plan": {
            "x": 0.5646,
            "y": 0.7325
          }
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
          "links": [
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
            },
            {
              "to": "lob-27",
              "yaw": 351.6,
              "pitch": -11.15
            },
            {
              "to": "lob-26",
              "yaw": 354.25,
              "pitch": -5.75
            },
            {
              "to": "lob-22",
              "yaw": 344.43,
              "pitch": -5.67
            },
            {
              "to": "lob-33",
              "yaw": 272.12,
              "pitch": -24.02
            },
            {
              "to": "aud-034",
              "yaw": 58.6,
              "pitch": -8.64
            }
          ],
          "plan": {
            "x": 0.6535,
            "y": 0.7221
          }
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
            },
            {
              "to": "aud-034",
              "yaw": 23.35,
              "pitch": -3.53
            },
            {
              "to": "lob-28",
              "yaw": 353.1,
              "pitch": -11.9
            },
            {
              "to": "lob-27",
              "yaw": 353.64,
              "pitch": -7.24
            }
          ],
          "plan": {
            "x": 0.7441,
            "y": 0.7072
          }
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
          "links": [
            {
              "to": "lob-30",
              "yaw": 0.14,
              "pitch": -24.5
            },
            {
              "to": "lob-29",
              "yaw": 360,
              "pitch": -12.87
            },
            {
              "to": "lob-28",
              "yaw": 1.42,
              "pitch": -6.85
            },
            {
              "to": "lob-32",
              "yaw": 346.04,
              "pitch": -9.28
            },
            {
              "to": "aud-034",
              "yaw": 21.11,
              "pitch": -3.39
            }
          ],
          "plan": {
            "x": 0.8129,
            "y": 0.6945
          }
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
            },
            {
              "to": "lob-31",
              "yaw": 150.68,
              "pitch": -9.97
            },
            {
              "to": "lob-27",
              "yaw": 20.16,
              "pitch": -14.85
            },
            {
              "to": "lob-26",
              "yaw": 12.45,
              "pitch": -11.3
            },
            {
              "to": "lob-25",
              "yaw": 11.07,
              "pitch": -5.73
            },
            {
              "to": "lob-21",
              "yaw": 336.71,
              "pitch": -12.97
            },
            {
              "to": "lob-22",
              "yaw": 353.95,
              "pitch": -6.22
            },
            {
              "to": "aud-034",
              "yaw": 84.61,
              "pitch": -2.33
            },
            {
              "to": "lob-09",
              "yaw": 334.81,
              "pitch": -22.19
            },
            {
              "to": "lob-10",
              "yaw": 322.8,
              "pitch": -31.6
            },
            {
              "to": "lob-11",
              "yaw": 283.52,
              "pitch": -44.31
            },
            {
              "to": "lob-01",
              "yaw": 317.29,
              "pitch": -15.71
            },
            {
              "to": "lob-02",
              "yaw": 309.68,
              "pitch": -17.75
            },
            {
              "to": "lob-03",
              "yaw": 294.43,
              "pitch": -20.67
            },
            {
              "to": "lob-04",
              "yaw": 276.1,
              "pitch": -22.08
            },
            {
              "to": "lob-05",
              "yaw": 260.62,
              "pitch": -22.24
            },
            {
              "to": "lob-07",
              "yaw": 306.38,
              "pitch": -25.35
            },
            {
              "to": "lob-08",
              "yaw": 321.89,
              "pitch": -19.87
            }
          ],
          "plan": {
            "x": 0.6418,
            "y": 0.7681
          }
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
          "links": [
            {
              "to": "lob-32",
              "yaw": 60.02,
              "pitch": 5.99
            },
            {
              "to": "lob-21",
              "yaw": 340.52,
              "pitch": -5.08
            },
            {
              "to": "lob-22",
              "yaw": 0.84,
              "pitch": 4.55
            },
            {
              "to": "lob-06",
              "yaw": 288.27,
              "pitch": -34.81
            },
            {
              "to": "lob-07",
              "yaw": 316.08,
              "pitch": -17.39
            },
            {
              "to": "lob-08",
              "yaw": 326.18,
              "pitch": -11.08
            },
            {
              "to": "lob-01",
              "yaw": 318.05,
              "pitch": -9.24
            },
            {
              "to": "lob-02",
              "yaw": 310.19,
              "pitch": -12.24
            },
            {
              "to": "lob-03",
              "yaw": 300.75,
              "pitch": -16.28
            },
            {
              "to": "lob-04",
              "yaw": 273.82,
              "pitch": -22.4
            },
            {
              "to": "lob-05",
              "yaw": 249.39,
              "pitch": -22.36
            },
            {
              "to": "lob-09",
              "yaw": 345.85,
              "pitch": -13.52
            },
            {
              "to": "lob-10",
              "yaw": 347.44,
              "pitch": -21.9
            },
            {
              "to": "lob-11",
              "yaw": 358.37,
              "pitch": -43.81
            },
            {
              "to": "lob-18",
              "yaw": 0.76,
              "pitch": -7.21
            },
            {
              "to": "aud-034",
              "yaw": 63.15,
              "pitch": 13.91
            }
          ],
          "plan": {
            "x": 0.6552,
            "y": 0.829
          }
        }
      ],
      "boundaries": [
        {
          "node": "lob-21",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-22",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-23",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-24",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-29",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-30",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-31",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-32",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "lob-33",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        }
      ],
      "updatedAt": "2026-08-23"
    },
    {
      "id": "auditorium",
      "name": "觀眾席",
      "order": 2,
      "status": "ready",
      "photoCount": 51,
      "sourcePhotos": 51,
      "nodes": [
        {
          "id": "aud-001",
          "name": "觀眾席一樓 01",
          "floor": "1F",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/aud-001-preview.webp",
            "mid": "pano/20260823-v1/aud-001-mid.webp",
            "full": "pano/20260823-v1/aud-001-full.webp"
          },
          "source": "CAM_20260820144834_0001_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-002",
              "yaw": 188.47,
              "pitch": -6.87
            },
            {
              "to": "aud-003",
              "yaw": 182.94,
              "pitch": -1.38
            },
            {
              "to": "aud-006",
              "yaw": 213.85,
              "pitch": -0.33
            },
            {
              "to": "aud-011",
              "yaw": 229.23,
              "pitch": 4.19
            },
            {
              "to": "aud-005",
              "yaw": 201.24,
              "pitch": 1.93
            },
            {
              "to": "aud-031",
              "yaw": 247.81,
              "pitch": 9.03
            },
            {
              "to": "aud-034",
              "yaw": 239.49,
              "pitch": 11.3
            },
            {
              "to": "aud-035",
              "yaw": 260.9,
              "pitch": 10.81
            },
            {
              "to": "aud-007",
              "yaw": 270.79,
              "pitch": -5.23
            },
            {
              "to": "aud-010",
              "yaw": 269.2,
              "pitch": 2.46
            },
            {
              "to": "aud-030",
              "yaw": 268.54,
              "pitch": 9.23
            },
            {
              "to": "aud-029",
              "yaw": 281.19,
              "pitch": 9.12
            },
            {
              "to": "aud-008",
              "yaw": 308.59,
              "pitch": -1.76
            },
            {
              "to": "aud-009",
              "yaw": 296.93,
              "pitch": 3.27
            },
            {
              "to": "aud-019",
              "yaw": 289.38,
              "pitch": 6.39
            },
            {
              "to": "stg-001",
              "yaw": 96.48,
              "pitch": -28.27
            },
            {
              "to": "stg-002",
              "yaw": 147.83,
              "pitch": -17.49
            },
            {
              "to": "stg-003",
              "yaw": 165.53,
              "pitch": -6.78
            },
            {
              "to": "stg-008",
              "yaw": 84.44,
              "pitch": -6.2
            },
            {
              "to": "stg-007",
              "yaw": 113.09,
              "pitch": -4.71
            },
            {
              "to": "stg-006",
              "yaw": 144.66,
              "pitch": -2.87
            }
          ],
          "seat": "1F-1-21"
        },
        {
          "id": "aud-002",
          "name": "觀眾席一樓 02",
          "floor": "1F",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/aud-002-preview.webp",
            "mid": "pano/20260823-v1/aud-002-mid.webp",
            "full": "pano/20260823-v1/aud-002-full.webp"
          },
          "source": "CAM_20260820144908_0002_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-003",
              "yaw": 178.07,
              "pitch": -5.57
            },
            {
              "to": "aud-005",
              "yaw": 205.48,
              "pitch": 0.16
            },
            {
              "to": "aud-012",
              "yaw": 222.2,
              "pitch": 3.84
            },
            {
              "to": "aud-032",
              "yaw": 244.07,
              "pitch": 9.65
            },
            {
              "to": "aud-034",
              "yaw": 254.88,
              "pitch": 10.09
            },
            {
              "to": "aud-006",
              "yaw": 266.97,
              "pitch": -6.13
            },
            {
              "to": "aud-011",
              "yaw": 267.02,
              "pitch": 1.27
            },
            {
              "to": "aud-031",
              "yaw": 267.62,
              "pitch": 9.42
            },
            {
              "to": "aud-035",
              "yaw": 277.71,
              "pitch": 10.81
            },
            {
              "to": "aud-030",
              "yaw": 285.31,
              "pitch": 8.59
            },
            {
              "to": "aud-017",
              "yaw": 303.8,
              "pitch": 4
            },
            {
              "to": "aud-007",
              "yaw": 327.99,
              "pitch": -1.29
            },
            {
              "to": "aud-001",
              "yaw": 0.8,
              "pitch": -10.35
            },
            {
              "to": "stg-001",
              "yaw": 24.84,
              "pitch": -13.61
            },
            {
              "to": "stg-002",
              "yaw": 85.29,
              "pitch": -23.09
            },
            {
              "to": "stg-003",
              "yaw": 143.05,
              "pitch": -12.08
            },
            {
              "to": "stg-004",
              "yaw": 131.65,
              "pitch": -2.42
            },
            {
              "to": "stg-005",
              "yaw": 110.59,
              "pitch": -3.36
            },
            {
              "to": "stg-006",
              "yaw": 85.24,
              "pitch": -4.69
            },
            {
              "to": "stg-007",
              "yaw": 59.77,
              "pitch": -4
            },
            {
              "to": "stg-008",
              "yaw": 41.54,
              "pitch": -3.89
            }
          ],
          "seat": "1F-1-1"
        },
        {
          "id": "aud-003",
          "name": "觀眾席一樓 03",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/aud-003-preview.webp",
            "mid": "pano/20260823-v1/aud-003-mid.webp",
            "full": "pano/20260823-v1/aud-003-full.webp"
          },
          "source": "CAM_20260820144936_0003_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-002",
              "yaw": 348.63,
              "pitch": -8.71
            },
            {
              "to": "aud-001",
              "yaw": 358.92,
              "pitch": -3.83
            },
            {
              "to": "aud-006",
              "yaw": 320.15,
              "pitch": -1.21
            },
            {
              "to": "aud-011",
              "yaw": 304.94,
              "pitch": 3.99
            },
            {
              "to": "aud-005",
              "yaw": 268.58,
              "pitch": -2.53
            },
            {
              "to": "aud-012",
              "yaw": 268.23,
              "pitch": 3.44
            },
            {
              "to": "aud-032",
              "yaw": 267.25,
              "pitch": 8.93
            },
            {
              "to": "aud-034",
              "yaw": 275.75,
              "pitch": 10.7
            },
            {
              "to": "aud-031",
              "yaw": 285.78,
              "pitch": 8.39
            },
            {
              "to": "aud-035",
              "yaw": 295.07,
              "pitch": 9.44
            },
            {
              "to": "aud-033",
              "yaw": 255.96,
              "pitch": 10
            },
            {
              "to": "aud-004",
              "yaw": 222.18,
              "pitch": 0.36
            },
            {
              "to": "aud-013",
              "yaw": 238.15,
              "pitch": 3.82
            },
            {
              "to": "aud-014",
              "yaw": 247.52,
              "pitch": 6.65
            },
            {
              "to": "stg-003",
              "yaw": 84.83,
              "pitch": -22.98
            },
            {
              "to": "stg-002",
              "yaw": 28.58,
              "pitch": -14.95
            },
            {
              "to": "stg-001",
              "yaw": 15.5,
              "pitch": -8.04
            },
            {
              "to": "stg-004",
              "yaw": 95.61,
              "pitch": -4.42
            },
            {
              "to": "stg-005",
              "yaw": 74.18,
              "pitch": -4.64
            },
            {
              "to": "stg-006",
              "yaw": 37.41,
              "pitch": -3.97
            },
            {
              "to": "stg-007",
              "yaw": 28.15,
              "pitch": -3.51
            }
          ],
          "seat": "1F-1-26"
        },
        {
          "id": "aud-004",
          "name": "觀眾席一樓 04",
          "floor": "1F",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/aud-004-preview.webp",
            "mid": "pano/20260823-v1/aud-004-mid.webp",
            "full": "pano/20260823-v1/aud-004-full.webp"
          },
          "source": "CAM_20260820145007_0004_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-003",
              "yaw": 34.88,
              "pitch": -15.92
            },
            {
              "to": "aud-005",
              "yaw": 333.5,
              "pitch": -11.29
            },
            {
              "to": "aud-006",
              "yaw": 340.82,
              "pitch": -4.38
            },
            {
              "to": "aud-002",
              "yaw": 7.16,
              "pitch": -7.07
            },
            {
              "to": "aud-012",
              "yaw": 307.22,
              "pitch": -2.3
            },
            {
              "to": "aud-015",
              "yaw": 295.11,
              "pitch": 2.15
            },
            {
              "to": "aud-016",
              "yaw": 322.18,
              "pitch": 1.75
            },
            {
              "to": "aud-013",
              "yaw": 259.79,
              "pitch": -5.3
            },
            {
              "to": "aud-014",
              "yaw": 259.61,
              "pitch": 1.94
            },
            {
              "to": "aud-033",
              "yaw": 260.77,
              "pitch": 9.22
            },
            {
              "to": "aud-032",
              "yaw": 275.41,
              "pitch": 8.53
            },
            {
              "to": "aud-034",
              "yaw": 283.28,
              "pitch": 10.18
            },
            {
              "to": "aud-035",
              "yaw": 302.63,
              "pitch": 8.35
            }
          ],
          "seat": "1F-6-34"
        },
        {
          "id": "aud-005",
          "name": "觀眾席一樓 05",
          "floor": "1F",
          "heading": 93,
          "images": {
            "preview": "pano/20260823-v1/aud-005-preview.webp",
            "mid": "pano/20260823-v1/aud-005-mid.webp",
            "full": "pano/20260823-v1/aud-005-full.webp"
          },
          "source": "CAM_20260820145029_0005_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-003",
              "yaw": 91.17,
              "pitch": -16.86
            },
            {
              "to": "aud-004",
              "yaw": 161.74,
              "pitch": -10.78
            },
            {
              "to": "aud-013",
              "yaw": 198.39,
              "pitch": -3.02
            },
            {
              "to": "aud-014",
              "yaw": 223.17,
              "pitch": 3.73
            },
            {
              "to": "aud-023",
              "yaw": 237.59,
              "pitch": 6
            },
            {
              "to": "aud-033",
              "yaw": 249.42,
              "pitch": 9.44
            },
            {
              "to": "aud-032",
              "yaw": 265.83,
              "pitch": 9.24
            },
            {
              "to": "aud-034",
              "yaw": 274.39,
              "pitch": 11.95
            },
            {
              "to": "aud-012",
              "yaw": 268.12,
              "pitch": -8.68
            },
            {
              "to": "aud-015",
              "yaw": 266.45,
              "pitch": 1.86
            },
            {
              "to": "aud-006",
              "yaw": 348.81,
              "pitch": -7.38
            },
            {
              "to": "aud-011",
              "yaw": 326.02,
              "pitch": -2.01
            },
            {
              "to": "aud-016",
              "yaw": 313.8,
              "pitch": 1.76
            },
            {
              "to": "aud-031",
              "yaw": 287.59,
              "pitch": 9.3
            },
            {
              "to": "aud-035",
              "yaw": 298.42,
              "pitch": 8.3
            },
            {
              "to": "aud-002",
              "yaw": 27.89,
              "pitch": -10.81
            }
          ],
          "seat": "1F-6-24"
        },
        {
          "id": "aud-006",
          "name": "觀眾席一樓 06",
          "floor": "1F",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/aud-006-preview.webp",
            "mid": "pano/20260823-v1/aud-006-mid.webp",
            "full": "pano/20260823-v1/aud-006-full.webp"
          },
          "source": "CAM_20260820145059_0006_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-002",
              "yaw": 88.99,
              "pitch": -15.45
            },
            {
              "to": "aud-005",
              "yaw": 172.96,
              "pitch": -7.22
            },
            {
              "to": "aud-012",
              "yaw": 199.5,
              "pitch": 0.32
            },
            {
              "to": "aud-015",
              "yaw": 216.55,
              "pitch": 3.81
            },
            {
              "to": "aud-032",
              "yaw": 240.25,
              "pitch": 9
            },
            {
              "to": "aud-034",
              "yaw": 251.78,
              "pitch": 11.54
            },
            {
              "to": "aud-011",
              "yaw": 265.76,
              "pitch": -1.04
            },
            {
              "to": "aud-016",
              "yaw": 266.58,
              "pitch": 3.98
            },
            {
              "to": "aud-031",
              "yaw": 266.74,
              "pitch": 9.26
            },
            {
              "to": "aud-035",
              "yaw": 281.52,
              "pitch": 10.37
            },
            {
              "to": "aud-030",
              "yaw": 291.04,
              "pitch": 8.91
            },
            {
              "to": "aud-020",
              "yaw": 315,
              "pitch": 2.83
            },
            {
              "to": "aud-027",
              "yaw": 302.37,
              "pitch": 5.63
            },
            {
              "to": "aud-017",
              "yaw": 323.96,
              "pitch": 0.85
            },
            {
              "to": "aud-010",
              "yaw": 340.12,
              "pitch": -3.73
            },
            {
              "to": "aud-007",
              "yaw": 0.53,
              "pitch": -9.11
            },
            {
              "to": "aud-001",
              "yaw": 36.98,
              "pitch": -11.17
            },
            {
              "to": "aud-003",
              "yaw": 141.08,
              "pitch": -8.25
            }
          ],
          "seat": "1F-6-1"
        },
        {
          "id": "aud-007",
          "name": "觀眾席一樓 07",
          "floor": "1F",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/aud-007-preview.webp",
            "mid": "pano/20260823-v1/aud-007-mid.webp",
            "full": "pano/20260823-v1/aud-007-full.webp"
          },
          "source": "CAM_20260820145127_0007_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-001",
              "yaw": 89.15,
              "pitch": -15.75
            },
            {
              "to": "aud-002",
              "yaw": 146.82,
              "pitch": -8.77
            },
            {
              "to": "aud-006",
              "yaw": 185.75,
              "pitch": -7.16
            },
            {
              "to": "aud-011",
              "yaw": 212.8,
              "pitch": -0.07
            },
            {
              "to": "aud-016",
              "yaw": 230.38,
              "pitch": 3.26
            },
            {
              "to": "aud-031",
              "yaw": 247.19,
              "pitch": 8.91
            },
            {
              "to": "aud-034",
              "yaw": 236.91,
              "pitch": 11.93
            },
            {
              "to": "aud-035",
              "yaw": 261.75,
              "pitch": 10.48
            },
            {
              "to": "aud-030",
              "yaw": 270.28,
              "pitch": 9.98
            },
            {
              "to": "aud-010",
              "yaw": 279.7,
              "pitch": -8.26
            },
            {
              "to": "aud-017",
              "yaw": 275.28,
              "pitch": 2.33
            },
            {
              "to": "aud-029",
              "yaw": 286.19,
              "pitch": 9.26
            },
            {
              "to": "aud-019",
              "yaw": 306.06,
              "pitch": 4.96
            },
            {
              "to": "aud-018",
              "yaw": 320.26,
              "pitch": 1.31
            },
            {
              "to": "aud-009",
              "yaw": 341.41,
              "pitch": -4.18
            },
            {
              "to": "aud-008",
              "yaw": 13.11,
              "pitch": -12.37
            }
          ],
          "seat": "1F-6-21"
        },
        {
          "id": "aud-008",
          "name": "觀眾席一樓 08",
          "floor": "1F",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/aud-008-preview.webp",
            "mid": "pano/20260823-v1/aud-008-mid.webp",
            "full": "pano/20260823-v1/aud-008-full.webp"
          },
          "source": "CAM_20260820145149_0008_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-001",
              "yaw": 133.77,
              "pitch": -12.25
            },
            {
              "to": "aud-002",
              "yaw": 160.79,
              "pitch": -6.01
            },
            {
              "to": "aud-007",
              "yaw": 193.34,
              "pitch": -11.55
            },
            {
              "to": "aud-006",
              "yaw": 186.45,
              "pitch": -3.01
            },
            {
              "to": "aud-011",
              "yaw": 202.17,
              "pitch": 0.99
            },
            {
              "to": "aud-016",
              "yaw": 213.74,
              "pitch": 3.49
            },
            {
              "to": "aud-017",
              "yaw": 241.54,
              "pitch": 4.46
            },
            {
              "to": "aud-010",
              "yaw": 218.61,
              "pitch": -3.1
            },
            {
              "to": "aud-009",
              "yaw": 272.69,
              "pitch": -4.83
            },
            {
              "to": "aud-018",
              "yaw": 270.26,
              "pitch": 2.74
            },
            {
              "to": "aud-029",
              "yaw": 267.86,
              "pitch": 8.81
            },
            {
              "to": "aud-030",
              "yaw": 255.15,
              "pitch": 8.67
            },
            {
              "to": "aud-035",
              "yaw": 246.81,
              "pitch": 10.23
            },
            {
              "to": "aud-034",
              "yaw": 225.98,
              "pitch": 7.81
            }
          ],
          "seat": "1F-6-33"
        },
        {
          "id": "aud-009",
          "name": "觀眾席一樓 09",
          "floor": "1F",
          "heading": 81,
          "images": {
            "preview": "pano/20260823-v1/aud-009-preview.webp",
            "mid": "pano/20260823-v1/aud-009-mid.webp",
            "full": "pano/20260823-v1/aud-009-full.webp"
          },
          "source": "CAM_20260820145221_0009_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-008",
              "yaw": 87.78,
              "pitch": -22.02
            },
            {
              "to": "aud-001",
              "yaw": 117.39,
              "pitch": -12.3
            },
            {
              "to": "aud-007",
              "yaw": 132.12,
              "pitch": -15.5
            },
            {
              "to": "aud-010",
              "yaw": 192.96,
              "pitch": -10.88
            },
            {
              "to": "aud-017",
              "yaw": 228.77,
              "pitch": -0.15
            },
            {
              "to": "aud-020",
              "yaw": 239.26,
              "pitch": 2.67
            },
            {
              "to": "aud-027",
              "yaw": 245.87,
              "pitch": 5.3
            },
            {
              "to": "aud-030",
              "yaw": 252.29,
              "pitch": 7.58
            },
            {
              "to": "aud-035",
              "yaw": 243.33,
              "pitch": 10.15
            },
            {
              "to": "aud-011",
              "yaw": 188.33,
              "pitch": -3.5
            },
            {
              "to": "aud-016",
              "yaw": 206.05,
              "pitch": 0.92
            },
            {
              "to": "aud-031",
              "yaw": 227.73,
              "pitch": 6.83
            },
            {
              "to": "aud-029",
              "yaw": 269.72,
              "pitch": 8.67
            },
            {
              "to": "aud-019",
              "yaw": 272.06,
              "pitch": 3.44
            },
            {
              "to": "aud-018",
              "yaw": 274.22,
              "pitch": -2.55
            },
            {
              "to": "aud-002",
              "yaw": 143.95,
              "pitch": -8.04
            },
            {
              "to": "aud-006",
              "yaw": 163.37,
              "pitch": -6.91
            }
          ],
          "seat": "1F-10-33"
        },
        {
          "id": "aud-010",
          "name": "觀眾席一樓 10",
          "floor": "1F",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/aud-010-preview.webp",
            "mid": "pano/20260823-v1/aud-010-mid.webp",
            "full": "pano/20260823-v1/aud-010-full.webp"
          },
          "source": "CAM_20260820145245_0010_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-007",
              "yaw": 96.2,
              "pitch": -22.43
            },
            {
              "to": "aud-001",
              "yaw": 94.21,
              "pitch": -12.94
            },
            {
              "to": "aud-002",
              "yaw": 132.06,
              "pitch": -9.92
            },
            {
              "to": "aud-006",
              "yaw": 152.88,
              "pitch": -10.81
            },
            {
              "to": "aud-011",
              "yaw": 184.68,
              "pitch": -7.21
            },
            {
              "to": "aud-016",
              "yaw": 213.23,
              "pitch": -0.02
            },
            {
              "to": "aud-021",
              "yaw": 223.65,
              "pitch": 2.57
            },
            {
              "to": "aud-026",
              "yaw": 233.84,
              "pitch": 5.04
            },
            {
              "to": "aud-031",
              "yaw": 241.37,
              "pitch": 7.37
            },
            {
              "to": "aud-035",
              "yaw": 259.17,
              "pitch": 11.52
            },
            {
              "to": "aud-030",
              "yaw": 272.22,
              "pitch": 8.19
            },
            {
              "to": "aud-020",
              "yaw": 272.97,
              "pitch": 2.44
            },
            {
              "to": "aud-017",
              "yaw": 273.55,
              "pitch": -4.89
            },
            {
              "to": "aud-029",
              "yaw": 290.21,
              "pitch": 8.79
            },
            {
              "to": "aud-028",
              "yaw": 301.84,
              "pitch": 5.19
            },
            {
              "to": "aud-019",
              "yaw": 313.78,
              "pitch": 0.55
            },
            {
              "to": "aud-018",
              "yaw": 330.44,
              "pitch": -2.55
            },
            {
              "to": "aud-009",
              "yaw": 14.21,
              "pitch": -13.98
            },
            {
              "to": "aud-008",
              "yaw": 50.85,
              "pitch": -12.51
            },
            {
              "to": "aud-003",
              "yaw": 150.07,
              "pitch": -5.5
            }
          ],
          "seat": "1F-10-21"
        },
        {
          "id": "aud-011",
          "name": "觀眾席一樓 11",
          "floor": "1F",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/aud-011-preview.webp",
            "mid": "pano/20260823-v1/aud-011-mid.webp",
            "full": "pano/20260823-v1/aud-011-full.webp"
          },
          "source": "CAM_20260820145315_0011_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-006",
              "yaw": 92.48,
              "pitch": -18.57
            },
            {
              "to": "aud-002",
              "yaw": 92.48,
              "pitch": -12.12
            },
            {
              "to": "aud-003",
              "yaw": 128.08,
              "pitch": -9.51
            },
            {
              "to": "aud-005",
              "yaw": 148.98,
              "pitch": -9.45
            },
            {
              "to": "aud-012",
              "yaw": 177.1,
              "pitch": -7.25
            },
            {
              "to": "aud-015",
              "yaw": 205.8,
              "pitch": -0.13
            },
            {
              "to": "aud-022",
              "yaw": 219.46,
              "pitch": 2.22
            },
            {
              "to": "aud-025",
              "yaw": 231.18,
              "pitch": 5.92
            },
            {
              "to": "aud-032",
              "yaw": 241.24,
              "pitch": 9.62
            },
            {
              "to": "aud-034",
              "yaw": 253.32,
              "pitch": 12.58
            },
            {
              "to": "aud-016",
              "yaw": 273.47,
              "pitch": -1.8
            },
            {
              "to": "aud-021",
              "yaw": 274.49,
              "pitch": 3.74
            },
            {
              "to": "aud-031",
              "yaw": 271.78,
              "pitch": 8.68
            },
            {
              "to": "aud-035",
              "yaw": 290.35,
              "pitch": 9.74
            },
            {
              "to": "aud-030",
              "yaw": 302.01,
              "pitch": 7.64
            },
            {
              "to": "aud-020",
              "yaw": 318.92,
              "pitch": 1.66
            },
            {
              "to": "aud-017",
              "yaw": 336.27,
              "pitch": -0.81
            },
            {
              "to": "aud-010",
              "yaw": 3.5,
              "pitch": -7.78
            },
            {
              "to": "aud-007",
              "yaw": 38.89,
              "pitch": -10.65
            },
            {
              "to": "aud-001",
              "yaw": 56.38,
              "pitch": -10.85
            }
          ],
          "seat": "1F-10-1"
        },
        {
          "id": "aud-012",
          "name": "觀眾席一樓 12",
          "floor": "1F",
          "heading": 93,
          "images": {
            "preview": "pano/20260823-v1/aud-012-preview.webp",
            "mid": "pano/20260823-v1/aud-012-mid.webp",
            "full": "pano/20260823-v1/aud-012-full.webp"
          },
          "source": "CAM_20260820145341_0012_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-013",
              "yaw": 167.81,
              "pitch": -10.99
            },
            {
              "to": "aud-014",
              "yaw": 208.23,
              "pitch": -1.44
            },
            {
              "to": "aud-023",
              "yaw": 225.73,
              "pitch": 2.1
            },
            {
              "to": "aud-024",
              "yaw": 239.18,
              "pitch": 5.93
            },
            {
              "to": "aud-033",
              "yaw": 249.62,
              "pitch": 9.42
            },
            {
              "to": "aud-015",
              "yaw": 267.98,
              "pitch": -0.97
            },
            {
              "to": "aud-032",
              "yaw": 269.47,
              "pitch": 8.19
            },
            {
              "to": "aud-034",
              "yaw": 280.74,
              "pitch": 11.3
            },
            {
              "to": "aud-031",
              "yaw": 297.98,
              "pitch": 7.5
            },
            {
              "to": "aud-021",
              "yaw": 314.32,
              "pitch": 2.22
            },
            {
              "to": "aud-016",
              "yaw": 330,
              "pitch": -1.06
            },
            {
              "to": "aud-011",
              "yaw": 353.74,
              "pitch": -9
            },
            {
              "to": "aud-006",
              "yaw": 31.95,
              "pitch": -12.16
            },
            {
              "to": "aud-002",
              "yaw": 52.57,
              "pitch": -11.32
            },
            {
              "to": "aud-003",
              "yaw": 96.82,
              "pitch": -12.89
            },
            {
              "to": "aud-005",
              "yaw": 98.87,
              "pitch": -21.74
            },
            {
              "to": "aud-004",
              "yaw": 132.29,
              "pitch": -11.53
            }
          ],
          "seat": "1F-10-24"
        },
        {
          "id": "aud-013",
          "name": "觀眾席一樓 13",
          "floor": "1F",
          "heading": 102,
          "images": {
            "preview": "pano/20260823-v1/aud-013-preview.webp",
            "mid": "pano/20260823-v1/aud-013-mid.webp",
            "full": "pano/20260823-v1/aud-013-full.webp"
          },
          "source": "CAM_20260820145402_0013_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-004",
              "yaw": 97.08,
              "pitch": -20.26
            },
            {
              "to": "aud-003",
              "yaw": 73.71,
              "pitch": -13.47
            },
            {
              "to": "aud-005",
              "yaw": 47.96,
              "pitch": -16.93
            },
            {
              "to": "aud-012",
              "yaw": 354.9,
              "pitch": -15.6
            },
            {
              "to": "aud-015",
              "yaw": 316.18,
              "pitch": -1.25
            },
            {
              "to": "aud-016",
              "yaw": 342.35,
              "pitch": -0.42
            },
            {
              "to": "aud-011",
              "yaw": 358.77,
              "pitch": -5.52
            },
            {
              "to": "aud-006",
              "yaw": 24.45,
              "pitch": -9.21
            },
            {
              "to": "aud-002",
              "yaw": 43.85,
              "pitch": -10.22
            },
            {
              "to": "aud-022",
              "yaw": 305.52,
              "pitch": 2.52
            },
            {
              "to": "aud-025",
              "yaw": 297.14,
              "pitch": 5.7
            },
            {
              "to": "aud-014",
              "yaw": 274.27,
              "pitch": -1.16
            },
            {
              "to": "aud-033",
              "yaw": 275.49,
              "pitch": 8.4
            }
          ],
          "seat": "1F-10-34"
        },
        {
          "id": "aud-014",
          "name": "觀眾席一樓 14",
          "floor": "1F",
          "heading": 95,
          "images": {
            "preview": "pano/20260823-v1/aud-014-preview.webp",
            "mid": "pano/20260823-v1/aud-014-mid.webp",
            "full": "pano/20260823-v1/aud-014-full.webp"
          },
          "source": "CAM_20260820145425_0014_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-013",
              "yaw": 90.15,
              "pitch": -26.05
            },
            {
              "to": "aud-004",
              "yaw": 89.55,
              "pitch": -16.29
            },
            {
              "to": "aud-023",
              "yaw": 262.96,
              "pitch": -4.72
            },
            {
              "to": "aud-024",
              "yaw": 265.31,
              "pitch": 3.29
            },
            {
              "to": "aud-033",
              "yaw": 267.54,
              "pitch": 8.98
            },
            {
              "to": "aud-032",
              "yaw": 286.31,
              "pitch": 7.44
            },
            {
              "to": "aud-025",
              "yaw": 299.63,
              "pitch": 0.65
            },
            {
              "to": "aud-022",
              "yaw": 312.22,
              "pitch": -5.98
            },
            {
              "to": "aud-034",
              "yaw": 298.72,
              "pitch": 8.5
            },
            {
              "to": "aud-021",
              "yaw": 335.02,
              "pitch": -2.74
            },
            {
              "to": "aud-026",
              "yaw": 321.43,
              "pitch": 1.88
            },
            {
              "to": "aud-015",
              "yaw": 340.34,
              "pitch": -12.65
            },
            {
              "to": "aud-003",
              "yaw": 69.25,
              "pitch": -12.45
            },
            {
              "to": "aud-012",
              "yaw": 26.78,
              "pitch": -16.27
            },
            {
              "to": "aud-005",
              "yaw": 52.76,
              "pitch": -15.72
            }
          ],
          "seat": "1F-13-32"
        },
        {
          "id": "aud-015",
          "name": "觀眾席一樓 15",
          "floor": "1F",
          "heading": 84,
          "images": {
            "preview": "pano/20260823-v1/aud-015-preview.webp",
            "mid": "pano/20260823-v1/aud-015-mid.webp",
            "full": "pano/20260823-v1/aud-015-full.webp"
          },
          "source": "CAM_20260820145450_0015_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-016",
              "yaw": 336.24,
              "pitch": -7.79
            },
            {
              "to": "aud-011",
              "yaw": 10.11,
              "pitch": -11.74
            },
            {
              "to": "aud-006",
              "yaw": 30.75,
              "pitch": -12.06
            },
            {
              "to": "aud-002",
              "yaw": 45.01,
              "pitch": -12.19
            },
            {
              "to": "aud-012",
              "yaw": 78.67,
              "pitch": -25.58
            },
            {
              "to": "aud-005",
              "yaw": 77.39,
              "pitch": -17.8
            },
            {
              "to": "aud-003",
              "yaw": 76.12,
              "pitch": -10.63
            },
            {
              "to": "aud-004",
              "yaw": 103.62,
              "pitch": -11.87
            },
            {
              "to": "aud-013",
              "yaw": 121.55,
              "pitch": -13.64
            },
            {
              "to": "aud-014",
              "yaw": 153.66,
              "pitch": -12.28
            },
            {
              "to": "aud-023",
              "yaw": 190.79,
              "pitch": -5.16
            },
            {
              "to": "aud-024",
              "yaw": 212.9,
              "pitch": 2.79
            },
            {
              "to": "aud-033",
              "yaw": 226.37,
              "pitch": 7.9
            },
            {
              "to": "aud-032",
              "yaw": 254.75,
              "pitch": 7.79
            },
            {
              "to": "aud-034",
              "yaw": 269.76,
              "pitch": 10.21
            },
            {
              "to": "aud-025",
              "yaw": 255.59,
              "pitch": -0.44
            },
            {
              "to": "aud-022",
              "yaw": 257.27,
              "pitch": -14.33
            },
            {
              "to": "aud-031",
              "yaw": 289.57,
              "pitch": 5.92
            },
            {
              "to": "aud-026",
              "yaw": 302.15,
              "pitch": 0.99
            },
            {
              "to": "aud-021",
              "yaw": 315.66,
              "pitch": -5.54
            }
          ],
          "seat": "1F-13-22"
        },
        {
          "id": "aud-016",
          "name": "觀眾席一樓 16",
          "floor": "1F",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/aud-016-preview.webp",
            "mid": "pano/20260823-v1/aud-016-mid.webp",
            "full": "pano/20260823-v1/aud-016-full.webp"
          },
          "source": "CAM_20260820145524_0016_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-011",
              "yaw": 88.4,
              "pitch": -24.2
            },
            {
              "to": "aud-006",
              "yaw": 88.83,
              "pitch": -17.33
            },
            {
              "to": "aud-002",
              "yaw": 89.56,
              "pitch": -10.4
            },
            {
              "to": "aud-003",
              "yaw": 119.07,
              "pitch": -8.72
            },
            {
              "to": "aud-005",
              "yaw": 134.6,
              "pitch": -10.06
            },
            {
              "to": "aud-012",
              "yaw": 158.48,
              "pitch": -7.87
            },
            {
              "to": "aud-015",
              "yaw": 175.96,
              "pitch": -5.85
            },
            {
              "to": "aud-022",
              "yaw": 198.59,
              "pitch": -3.16
            },
            {
              "to": "aud-025",
              "yaw": 213.72,
              "pitch": 1.76
            },
            {
              "to": "aud-032",
              "yaw": 226.5,
              "pitch": 6.99
            },
            {
              "to": "aud-034",
              "yaw": 243.96,
              "pitch": 10.98
            },
            {
              "to": "aud-031",
              "yaw": 268.99,
              "pitch": 8.64
            },
            {
              "to": "aud-026",
              "yaw": 269.08,
              "pitch": 1.55
            },
            {
              "to": "aud-021",
              "yaw": 269.54,
              "pitch": -10.85
            },
            {
              "to": "aud-035",
              "yaw": 293.48,
              "pitch": 10.57
            },
            {
              "to": "aud-030",
              "yaw": 308.61,
              "pitch": 6.35
            },
            {
              "to": "aud-027",
              "yaw": 325.88,
              "pitch": 0.38
            },
            {
              "to": "aud-020",
              "yaw": 337.8,
              "pitch": -5.19
            },
            {
              "to": "aud-017",
              "yaw": 0.7,
              "pitch": -8.31
            },
            {
              "to": "aud-010",
              "yaw": 33.83,
              "pitch": -11.17
            },
            {
              "to": "aud-007",
              "yaw": 52.65,
              "pitch": -12.1
            },
            {
              "to": "aud-001",
              "yaw": 63.48,
              "pitch": -10.78
            }
          ],
          "seat": "1F-13-1"
        },
        {
          "id": "aud-017",
          "name": "觀眾席一樓 17",
          "floor": "1F",
          "heading": 79,
          "images": {
            "preview": "pano/20260823-v1/aud-017-preview.webp",
            "mid": "pano/20260823-v1/aud-017-mid.webp",
            "full": "pano/20260823-v1/aud-017-full.webp"
          },
          "source": "CAM_20260820145551_0017_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-018",
              "yaw": 4.01,
              "pitch": -12.24
            },
            {
              "to": "aud-009",
              "yaw": 38.91,
              "pitch": -15.38
            },
            {
              "to": "aud-008",
              "yaw": 58.91,
              "pitch": -13.59
            },
            {
              "to": "aud-001",
              "yaw": 85.46,
              "pitch": -12.57
            },
            {
              "to": "aud-007",
              "yaw": 90.48,
              "pitch": -17.59
            },
            {
              "to": "aud-010",
              "yaw": 92.33,
              "pitch": -27.7
            },
            {
              "to": "aud-002",
              "yaw": 116.98,
              "pitch": -11
            },
            {
              "to": "aud-006",
              "yaw": 136.65,
              "pitch": -11.36
            },
            {
              "to": "aud-011",
              "yaw": 160.68,
              "pitch": -8.93
            },
            {
              "to": "aud-016",
              "yaw": 182.71,
              "pitch": -6.53
            },
            {
              "to": "aud-021",
              "yaw": 202.27,
              "pitch": -2.82
            },
            {
              "to": "aud-026",
              "yaw": 215.7,
              "pitch": 2.05
            },
            {
              "to": "aud-031",
              "yaw": 227.19,
              "pitch": 6.54
            },
            {
              "to": "aud-034",
              "yaw": 216.82,
              "pitch": 8.76
            },
            {
              "to": "aud-035",
              "yaw": 251.44,
              "pitch": 12.28
            },
            {
              "to": "aud-020",
              "yaw": 265.39,
              "pitch": -8.22
            },
            {
              "to": "aud-027",
              "yaw": 266.32,
              "pitch": 3.18
            },
            {
              "to": "aud-030",
              "yaw": 265.06,
              "pitch": 9.1
            },
            {
              "to": "aud-029",
              "yaw": 292.4,
              "pitch": 7.08
            },
            {
              "to": "aud-028",
              "yaw": 309.06,
              "pitch": 1.31
            },
            {
              "to": "aud-019",
              "yaw": 327.78,
              "pitch": -6.2
            }
          ],
          "seat": "1F-13-21"
        },
        {
          "id": "aud-018",
          "name": "觀眾席一樓 18",
          "floor": "1F",
          "heading": 81,
          "images": {
            "preview": "pano/20260823-v1/aud-018-preview.webp",
            "mid": "pano/20260823-v1/aud-018-mid.webp",
            "full": "pano/20260823-v1/aud-018-full.webp"
          },
          "source": "CAM_20260820145613_0018_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-009",
              "yaw": 85.01,
              "pitch": -23.63
            },
            {
              "to": "aud-008",
              "yaw": 86.54,
              "pitch": -16.46
            },
            {
              "to": "aud-001",
              "yaw": 103.75,
              "pitch": -12.07
            },
            {
              "to": "aud-007",
              "yaw": 123.17,
              "pitch": -15.39
            },
            {
              "to": "aud-010",
              "yaw": 155.45,
              "pitch": -14.08
            },
            {
              "to": "aud-017",
              "yaw": 193.76,
              "pitch": -10.82
            },
            {
              "to": "aud-016",
              "yaw": 185.4,
              "pitch": -3.49
            },
            {
              "to": "aud-002",
              "yaw": 133.45,
              "pitch": -9.14
            },
            {
              "to": "aud-006",
              "yaw": 147.38,
              "pitch": -9.31
            },
            {
              "to": "aud-011",
              "yaw": 167.93,
              "pitch": -6.38
            },
            {
              "to": "aud-021",
              "yaw": 198.86,
              "pitch": -0.97
            },
            {
              "to": "aud-026",
              "yaw": 208.52,
              "pitch": 2.01
            },
            {
              "to": "aud-031",
              "yaw": 217.57,
              "pitch": 5.72
            },
            {
              "to": "aud-035",
              "yaw": 236.69,
              "pitch": 8.91
            },
            {
              "to": "aud-030",
              "yaw": 245.13,
              "pitch": 6.92
            },
            {
              "to": "aud-027",
              "yaw": 232.01,
              "pitch": 2.14
            },
            {
              "to": "aud-020",
              "yaw": 220.08,
              "pitch": -6.24
            },
            {
              "to": "aud-029",
              "yaw": 267.21,
              "pitch": 7.7
            },
            {
              "to": "aud-028",
              "yaw": 269.91,
              "pitch": 1.81
            },
            {
              "to": "aud-019",
              "yaw": 273.45,
              "pitch": -9.45
            }
          ],
          "seat": "1F-13-33"
        },
        {
          "id": "aud-019",
          "name": "觀眾席一樓 19",
          "floor": "1F",
          "heading": 81,
          "images": {
            "preview": "pano/20260823-v1/aud-019-preview.webp",
            "mid": "pano/20260823-v1/aud-019-mid.webp",
            "full": "pano/20260823-v1/aud-019-full.webp"
          },
          "source": "CAM_20260820145646_0019_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-018",
              "yaw": 88.33,
              "pitch": -15.61
            },
            {
              "to": "aud-017",
              "yaw": 154.81,
              "pitch": -6.9
            },
            {
              "to": "aud-020",
              "yaw": 188.39,
              "pitch": -5.67
            },
            {
              "to": "aud-027",
              "yaw": 219.89,
              "pitch": 5.27
            },
            {
              "to": "aud-030",
              "yaw": 235.27,
              "pitch": 9.69
            },
            {
              "to": "aud-029",
              "yaw": 261.95,
              "pitch": 11.54
            },
            {
              "to": "aud-028",
              "yaw": 265.83,
              "pitch": 0.38
            },
            {
              "to": "aud-010",
              "yaw": 119.92,
              "pitch": -9.97
            }
          ],
          "seat": "1F-15-33"
        },
        {
          "id": "aud-020",
          "name": "觀眾席一樓 20",
          "floor": "1F",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/aud-020-preview.webp",
            "mid": "pano/20260823-v1/aud-020-mid.webp",
            "full": "pano/20260823-v1/aud-020-full.webp"
          },
          "source": "CAM_20260820145710_0020_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-017",
              "yaw": 101.7,
              "pitch": -13.62
            },
            {
              "to": "aud-016",
              "yaw": 171.2,
              "pitch": -4.94
            },
            {
              "to": "aud-021",
              "yaw": 191.57,
              "pitch": -3.67
            },
            {
              "to": "aud-026",
              "yaw": 213.61,
              "pitch": 3.59
            },
            {
              "to": "aud-031",
              "yaw": 231.88,
              "pitch": 8.26
            },
            {
              "to": "aud-035",
              "yaw": 259.04,
              "pitch": 13.9
            },
            {
              "to": "aud-030",
              "yaw": 282.36,
              "pitch": 11.71
            },
            {
              "to": "aud-027",
              "yaw": 282.05,
              "pitch": 4.63
            },
            {
              "to": "aud-029",
              "yaw": 311.21,
              "pitch": 10.49
            },
            {
              "to": "aud-028",
              "yaw": 341.11,
              "pitch": 4.1
            },
            {
              "to": "aud-019",
              "yaw": 14.51,
              "pitch": -4.87
            },
            {
              "to": "aud-018",
              "yaw": 44.88,
              "pitch": -7.74
            }
          ],
          "seat": "1F-15-21"
        },
        {
          "id": "aud-021",
          "name": "觀眾席一樓 21",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/aud-021-preview.webp",
            "mid": "pano/20260823-v1/aud-021-mid.webp",
            "full": "pano/20260823-v1/aud-021-full.webp"
          },
          "source": "CAM_20260820145744_0021_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-011",
              "yaw": 89.64,
              "pitch": -15.67
            },
            {
              "to": "aud-015",
              "yaw": 156.16,
              "pitch": -4.49
            },
            {
              "to": "aud-022",
              "yaw": 177.31,
              "pitch": -3.63
            },
            {
              "to": "aud-025",
              "yaw": 201.35,
              "pitch": 4.31
            },
            {
              "to": "aud-032",
              "yaw": 219.21,
              "pitch": 9.09
            },
            {
              "to": "aud-034",
              "yaw": 238.07,
              "pitch": 13.73
            },
            {
              "to": "aud-026",
              "yaw": 269.89,
              "pitch": -5.47
            },
            {
              "to": "aud-031",
              "yaw": 270.23,
              "pitch": 11.04
            },
            {
              "to": "aud-020",
              "yaw": 1.23,
              "pitch": -5.29
            },
            {
              "to": "aud-027",
              "yaw": 338.14,
              "pitch": 2.73
            },
            {
              "to": "aud-030",
              "yaw": 320.76,
              "pitch": 7.95
            },
            {
              "to": "aud-035",
              "yaw": 300.34,
              "pitch": 12.24
            },
            {
              "to": "aud-017",
              "yaw": 21.78,
              "pitch": -5.83
            }
          ],
          "seat": "1F-15-1"
        },
        {
          "id": "aud-022",
          "name": "觀眾席一樓 22",
          "floor": "1F",
          "heading": 95,
          "images": {
            "preview": "pano/20260823-v1/aud-022-preview.webp",
            "mid": "pano/20260823-v1/aud-022-mid.webp",
            "full": "pano/20260823-v1/aud-022-full.webp"
          },
          "source": "CAM_20260820145812_0022_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-014",
              "yaw": 139.44,
              "pitch": -5.78
            },
            {
              "to": "aud-023",
              "yaw": 167.19,
              "pitch": -4.37
            },
            {
              "to": "aud-024",
              "yaw": 193.76,
              "pitch": 4.08
            },
            {
              "to": "aud-033",
              "yaw": 228.42,
              "pitch": 12.23
            },
            {
              "to": "aud-025",
              "yaw": 271.32,
              "pitch": 0.28
            },
            {
              "to": "aud-032",
              "yaw": 266.12,
              "pitch": 11.26
            },
            {
              "to": "aud-034",
              "yaw": 283.47,
              "pitch": 13.77
            },
            {
              "to": "aud-026",
              "yaw": 328.35,
              "pitch": 2.32
            },
            {
              "to": "aud-021",
              "yaw": 350.49,
              "pitch": -5.83
            },
            {
              "to": "aud-016",
              "yaw": 11.54,
              "pitch": -6.01
            },
            {
              "to": "aud-015",
              "yaw": 90.6,
              "pitch": -13.07
            }
          ],
          "seat": "1F-15-24"
        },
        {
          "id": "aud-023",
          "name": "觀眾席一樓 23",
          "floor": "1F",
          "heading": 96,
          "images": {
            "preview": "pano/20260823-v1/aud-023-preview.webp",
            "mid": "pano/20260823-v1/aud-023-mid.webp",
            "full": "pano/20260823-v1/aud-023-full.webp"
          },
          "source": "CAM_20260820145834_0023_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-014",
              "yaw": 85.75,
              "pitch": -13.87
            },
            {
              "to": "aud-015",
              "yaw": 18.56,
              "pitch": -8.44
            },
            {
              "to": "aud-003",
              "yaw": 68.48,
              "pitch": -10.07
            },
            {
              "to": "aud-022",
              "yaw": 342.31,
              "pitch": -5.92
            },
            {
              "to": "aud-025",
              "yaw": 318.84,
              "pitch": 2.66
            },
            {
              "to": "aud-032",
              "yaw": 300.38,
              "pitch": 7.91
            },
            {
              "to": "aud-034",
              "yaw": 307.35,
              "pitch": 10.07
            },
            {
              "to": "aud-021",
              "yaw": 350.47,
              "pitch": -2.81
            },
            {
              "to": "aud-024",
              "yaw": 266.55,
              "pitch": 3.55
            },
            {
              "to": "aud-033",
              "yaw": 269.54,
              "pitch": 10.65
            }
          ],
          "seat": "1F-15-34"
        },
        {
          "id": "aud-024",
          "name": "觀眾席一樓 24",
          "floor": "1F",
          "heading": 102,
          "images": {
            "preview": "pano/20260823-v1/aud-024-preview.webp",
            "mid": "pano/20260823-v1/aud-024-mid.webp",
            "full": "pano/20260823-v1/aud-024-full.webp"
          },
          "source": "CAM_20260820145902_0024_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-023",
              "yaw": 95.48,
              "pitch": -20.73
            },
            {
              "to": "aud-014",
              "yaw": 90.79,
              "pitch": -14.23
            },
            {
              "to": "aud-015",
              "yaw": 46.93,
              "pitch": -12.51
            },
            {
              "to": "aud-022",
              "yaw": 28.11,
              "pitch": -13.65
            },
            {
              "to": "aud-025",
              "yaw": 350.12,
              "pitch": -7.74
            },
            {
              "to": "aud-032",
              "yaw": 315.13,
              "pitch": 5.02
            },
            {
              "to": "aud-034",
              "yaw": 322.61,
              "pitch": 8.59
            },
            {
              "to": "aud-033",
              "yaw": 272.4,
              "pitch": 9.7
            },
            {
              "to": "aud-021",
              "yaw": 9.8,
              "pitch": -5.6
            },
            {
              "to": "aud-026",
              "yaw": 352.97,
              "pitch": -1.24
            },
            {
              "to": "aud-031",
              "yaw": 336.31,
              "pitch": 2.87
            }
          ],
          "seat": "1F-17-34"
        },
        {
          "id": "aud-025",
          "name": "觀眾席一樓 25",
          "floor": "1F",
          "heading": 96,
          "images": {
            "preview": "pano/20260823-v1/aud-025-preview.webp",
            "mid": "pano/20260823-v1/aud-025-mid.webp",
            "full": "pano/20260823-v1/aud-025-full.webp"
          },
          "source": "CAM_20260820145925_0025_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-024",
              "yaw": 169,
              "pitch": -5.14
            },
            {
              "to": "aud-023",
              "yaw": 138.64,
              "pitch": -9.7
            },
            {
              "to": "aud-014",
              "yaw": 120.64,
              "pitch": -9.86
            },
            {
              "to": "aud-033",
              "yaw": 207.93,
              "pitch": 6.58
            },
            {
              "to": "aud-032",
              "yaw": 261.26,
              "pitch": 9.68
            },
            {
              "to": "aud-034",
              "yaw": 292.99,
              "pitch": 11.42
            },
            {
              "to": "aud-031",
              "yaw": 320.64,
              "pitch": 4.44
            },
            {
              "to": "aud-026",
              "yaw": 350.04,
              "pitch": -5.48
            },
            {
              "to": "aud-021",
              "yaw": 15.06,
              "pitch": -8.93
            },
            {
              "to": "aud-016",
              "yaw": 31.51,
              "pitch": -9.83
            },
            {
              "to": "aud-002",
              "yaw": 64.12,
              "pitch": -9.78
            },
            {
              "to": "aud-022",
              "yaw": 93.59,
              "pitch": -21.22
            },
            {
              "to": "aud-015",
              "yaw": 89.82,
              "pitch": -13.28
            }
          ],
          "seat": "1F-17-24"
        },
        {
          "id": "aud-026",
          "name": "觀眾席一樓 26",
          "floor": "1F",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/aud-026-preview.webp",
            "mid": "pano/20260823-v1/aud-026-mid.webp",
            "full": "pano/20260823-v1/aud-026-full.webp"
          },
          "source": "CAM_20260820145955_0026_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-021",
              "yaw": 91,
              "pitch": -20.36
            },
            {
              "to": "aud-016",
              "yaw": 90.59,
              "pitch": -13.9
            },
            {
              "to": "aud-015",
              "yaw": 139.14,
              "pitch": -8.03
            },
            {
              "to": "aud-003",
              "yaw": 112.33,
              "pitch": -8.44
            },
            {
              "to": "aud-022",
              "yaw": 155.39,
              "pitch": -6.8
            },
            {
              "to": "aud-025",
              "yaw": 177.76,
              "pitch": -3.58
            },
            {
              "to": "aud-032",
              "yaw": 203.1,
              "pitch": 4.89
            },
            {
              "to": "aud-034",
              "yaw": 225.08,
              "pitch": 10.34
            },
            {
              "to": "aud-031",
              "yaw": 271.57,
              "pitch": 10.21
            },
            {
              "to": "aud-035",
              "yaw": 315.77,
              "pitch": 10.94
            },
            {
              "to": "aud-030",
              "yaw": 334.14,
              "pitch": 4.04
            },
            {
              "to": "aud-027",
              "yaw": 3.26,
              "pitch": -4.52
            },
            {
              "to": "aud-020",
              "yaw": 26.76,
              "pitch": -8.66
            },
            {
              "to": "aud-017",
              "yaw": 41.34,
              "pitch": -8.8
            },
            {
              "to": "aud-001",
              "yaw": 66.7,
              "pitch": -8.95
            }
          ],
          "seat": "1F-17-1"
        },
        {
          "id": "aud-027",
          "name": "觀眾席一樓 27",
          "floor": "1F",
          "heading": 82,
          "images": {
            "preview": "pano/20260823-v1/aud-027-preview.webp",
            "mid": "pano/20260823-v1/aud-027-mid.webp",
            "full": "pano/20260823-v1/aud-027-full.webp"
          },
          "source": "CAM_20260820150022_0027_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-030",
              "yaw": 275.07,
              "pitch": 8.41
            },
            {
              "to": "aud-029",
              "yaw": 327.08,
              "pitch": 4.66
            },
            {
              "to": "aud-028",
              "yaw": 6.19,
              "pitch": -7.56
            },
            {
              "to": "aud-019",
              "yaw": 34.76,
              "pitch": -10.38
            },
            {
              "to": "aud-018",
              "yaw": 52.72,
              "pitch": -11.15
            },
            {
              "to": "aud-020",
              "yaw": 93.71,
              "pitch": -21.03
            },
            {
              "to": "aud-017",
              "yaw": 86.8,
              "pitch": -14.02
            },
            {
              "to": "aud-016",
              "yaw": 139.63,
              "pitch": -8.81
            },
            {
              "to": "aud-021",
              "yaw": 159.82,
              "pitch": -6.44
            },
            {
              "to": "aud-026",
              "yaw": 182.97,
              "pitch": -2.58
            },
            {
              "to": "aud-031",
              "yaw": 207.82,
              "pitch": 5.01
            },
            {
              "to": "aud-035",
              "yaw": 241.74,
              "pitch": 14.24
            }
          ],
          "seat": "1F-17-21"
        },
        {
          "id": "aud-028",
          "name": "觀眾席一樓 28",
          "floor": "1F",
          "heading": 73,
          "images": {
            "preview": "pano/20260823-v1/aud-028-preview.webp",
            "mid": "pano/20260823-v1/aud-028-mid.webp",
            "full": "pano/20260823-v1/aud-028-full.webp"
          },
          "source": "CAM_20260820150044_0028_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-019",
              "yaw": 86.47,
              "pitch": -20.88
            },
            {
              "to": "aud-018",
              "yaw": 87.22,
              "pitch": -14.01
            },
            {
              "to": "aud-017",
              "yaw": 128.86,
              "pitch": -11.39
            },
            {
              "to": "aud-020",
              "yaw": 149.2,
              "pitch": -12.23
            },
            {
              "to": "aud-027",
              "yaw": 188.71,
              "pitch": -6
            },
            {
              "to": "aud-030",
              "yaw": 222.23,
              "pitch": 5.37
            },
            {
              "to": "aud-035",
              "yaw": 214.99,
              "pitch": 9.94
            },
            {
              "to": "aud-026",
              "yaw": 182.33,
              "pitch": -0.91
            },
            {
              "to": "aud-021",
              "yaw": 167.59,
              "pitch": -4.16
            },
            {
              "to": "aud-016",
              "yaw": 155.17,
              "pitch": -5.86
            },
            {
              "to": "aud-001",
              "yaw": 95.76,
              "pitch": -9.91
            },
            {
              "to": "aud-002",
              "yaw": 119.93,
              "pitch": -8.28
            },
            {
              "to": "aud-029",
              "yaw": 266.99,
              "pitch": 8.1
            }
          ],
          "seat": "1F-17-33"
        },
        {
          "id": "aud-029",
          "name": "觀眾席一樓 29",
          "floor": "1F",
          "heading": 64,
          "images": {
            "preview": "pano/20260823-v1/aud-029-preview.webp",
            "mid": "pano/20260823-v1/aud-029-mid.webp",
            "full": "pano/20260823-v1/aud-029-full.webp"
          },
          "source": "CAM_20260820150112_0029_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-028",
              "yaw": 75.34,
              "pitch": -22.75
            },
            {
              "to": "aud-019",
              "yaw": 76.54,
              "pitch": -17.54
            },
            {
              "to": "aud-018",
              "yaw": 76.2,
              "pitch": -12.2
            },
            {
              "to": "aud-017",
              "yaw": 104.89,
              "pitch": -12.2
            },
            {
              "to": "aud-020",
              "yaw": 124.38,
              "pitch": -13.03
            },
            {
              "to": "aud-027",
              "yaw": 143.35,
              "pitch": -10.86
            },
            {
              "to": "aud-030",
              "yaw": 177.73,
              "pitch": -5.97
            },
            {
              "to": "aud-035",
              "yaw": 186.42,
              "pitch": 2.9
            },
            {
              "to": "aud-031",
              "yaw": 173.43,
              "pitch": -1.92
            },
            {
              "to": "aud-016",
              "yaw": 130.31,
              "pitch": -8.79
            }
          ],
          "seat": "1F-20-31"
        },
        {
          "id": "aud-030",
          "name": "觀眾席一樓 30",
          "floor": "1F",
          "heading": 84,
          "images": {
            "preview": "pano/20260823-v1/aud-030-preview.webp",
            "mid": "pano/20260823-v1/aud-030-mid.webp",
            "full": "pano/20260823-v1/aud-030-full.webp"
          },
          "source": "CAM_20260820150136_0030_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-029",
              "yaw": 7.58,
              "pitch": -6.63
            },
            {
              "to": "aud-035",
              "yaw": 220.82,
              "pitch": 1.48
            },
            {
              "to": "aud-031",
              "yaw": 189,
              "pitch": -4.02
            },
            {
              "to": "aud-026",
              "yaw": 170.21,
              "pitch": -5.88
            },
            {
              "to": "aud-021",
              "yaw": 147.78,
              "pitch": -9.95
            },
            {
              "to": "aud-016",
              "yaw": 131.02,
              "pitch": -11.18
            },
            {
              "to": "aud-002",
              "yaw": 111.54,
              "pitch": -10.05
            },
            {
              "to": "aud-027",
              "yaw": 89.6,
              "pitch": -22.74
            },
            {
              "to": "aud-020",
              "yaw": 90.82,
              "pitch": -17.2
            },
            {
              "to": "aud-001",
              "yaw": 91.98,
              "pitch": -11
            },
            {
              "to": "aud-018",
              "yaw": 67.05,
              "pitch": -11.16
            },
            {
              "to": "aud-019",
              "yaw": 56.33,
              "pitch": -12.53
            },
            {
              "to": "aud-028",
              "yaw": 36.96,
              "pitch": -11.09
            }
          ],
          "seat": "1F-20-19"
        },
        {
          "id": "aud-031",
          "name": "觀眾席一樓 31｜可移動收納席",
          "floor": "1F",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/aud-031-preview.webp",
            "mid": "pano/20260823-v1/aud-031-mid.webp",
            "full": "pano/20260823-v1/aud-031-full.webp"
          },
          "source": "CAM_20260820150213_0031_D.JPG",
          "description": "本區為可移動收納席，當演出團隊有找燈光音響廠商協助演出時，通常會給廠商使用的空間。",
          "hotspots": [],
          "links": [
            {
              "to": "aud-034",
              "yaw": 196.31,
              "pitch": 2.36
            },
            {
              "to": "aud-032",
              "yaw": 176.2,
              "pitch": -3.05
            },
            {
              "to": "aud-025",
              "yaw": 154.18,
              "pitch": -6.56
            },
            {
              "to": "aud-022",
              "yaw": 137.59,
              "pitch": -9.65
            },
            {
              "to": "aud-015",
              "yaw": 124.72,
              "pitch": -10.11
            },
            {
              "to": "aud-026",
              "yaw": 89.97,
              "pitch": -25.07
            },
            {
              "to": "aud-021",
              "yaw": 89.23,
              "pitch": -18.01
            },
            {
              "to": "aud-002",
              "yaw": 90.51,
              "pitch": -11.38
            },
            {
              "to": "aud-001",
              "yaw": 68.37,
              "pitch": -10.19
            },
            {
              "to": "aud-017",
              "yaw": 51.44,
              "pitch": -10.35
            },
            {
              "to": "aud-020",
              "yaw": 38.51,
              "pitch": -10.52
            },
            {
              "to": "aud-027",
              "yaw": 21.93,
              "pitch": -8.35
            },
            {
              "to": "aud-030",
              "yaw": 358.07,
              "pitch": -4.49
            },
            {
              "to": "aud-035",
              "yaw": 338.18,
              "pitch": 2.24
            },
            {
              "to": "aud-003",
              "yaw": 108.99,
              "pitch": -9.87
            }
          ],
          "seat": "1F-20-1"
        },
        {
          "id": "aud-032",
          "name": "觀眾席一樓 32",
          "floor": "1F",
          "heading": 96,
          "images": {
            "preview": "pano/20260823-v1/aud-032-preview.webp",
            "mid": "pano/20260823-v1/aud-032-mid.webp",
            "full": "pano/20260823-v1/aud-032-full.webp"
          },
          "source": "CAM_20260820150242_0032_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-033",
              "yaw": 171.9,
              "pitch": -5.75
            },
            {
              "to": "aud-024",
              "yaw": 138.31,
              "pitch": -9.17
            },
            {
              "to": "aud-023",
              "yaw": 123.73,
              "pitch": -11.13
            },
            {
              "to": "aud-025",
              "yaw": 85.41,
              "pitch": -25.48
            },
            {
              "to": "aud-022",
              "yaw": 85.52,
              "pitch": -16.6
            },
            {
              "to": "aud-034",
              "yaw": 314.32,
              "pitch": 1.3
            },
            {
              "to": "aud-031",
              "yaw": 346.74,
              "pitch": -5.74
            },
            {
              "to": "aud-026",
              "yaw": 14.38,
              "pitch": -8.19
            },
            {
              "to": "aud-021",
              "yaw": 34.4,
              "pitch": -11.44
            },
            {
              "to": "aud-016",
              "yaw": 46.88,
              "pitch": -11.53
            },
            {
              "to": "aud-002",
              "yaw": 66.49,
              "pitch": -10.84
            },
            {
              "to": "aud-014",
              "yaw": 111.26,
              "pitch": -10.74
            }
          ],
          "seat": "1F-20-20"
        },
        {
          "id": "aud-033",
          "name": "觀眾席一樓 33",
          "floor": "1F",
          "heading": 97,
          "images": {
            "preview": "pano/20260823-v1/aud-033-preview.webp",
            "mid": "pano/20260823-v1/aud-033-mid.webp",
            "full": "pano/20260823-v1/aud-033-full.webp"
          },
          "source": "CAM_20260820150302_0033_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-024",
              "yaw": 93.41,
              "pitch": -18.23
            },
            {
              "to": "aud-025",
              "yaw": 21.74,
              "pitch": -10.84
            },
            {
              "to": "aud-032",
              "yaw": 345.59,
              "pitch": -7.15
            },
            {
              "to": "aud-022",
              "yaw": 37.36,
              "pitch": -12.03
            },
            {
              "to": "aud-014",
              "yaw": 89.97,
              "pitch": -13.43
            },
            {
              "to": "aud-015",
              "yaw": 58.13,
              "pitch": -13.82
            },
            {
              "to": "aud-031",
              "yaw": 350.23,
              "pitch": -2.82
            }
          ],
          "seat": "1F-20-30"
        },
        {
          "id": "aud-034",
          "name": "觀眾席四號門入口",
          "floor": "1F",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/aud-034-preview.webp",
            "mid": "pano/20260823-v1/aud-034-mid.webp",
            "full": "pano/20260823-v1/aud-034-full.webp"
          },
          "source": "CAM_20260820150336_0034_D.JPG",
          "description": "音樂廳入口兩道門之間的空間通常被稱為「聲閘」（Acoustic Airlock / Sound Lock）。\n核心功能隔絕噪音：防止大廳的交談聲、腳步聲漏進場內。\n阻絕光線：避免開門時外面的光線影響場內照明。\n維持氣壓：穩定音樂廳內的空調與氣流。\n其他常見稱呼：隔音緩衝區、聲音前廳（Sound Vestibule）。",
          "hotspots": [],
          "links": [
            {
              "to": "aud-032",
              "yaw": 122.77,
              "pitch": -1.77
            },
            {
              "to": "lob-29",
              "yaw": 176.31,
              "pitch": -0.24
            }
          ],
          "seat": "1F-20-12",
          "spaceType": "走道或銜接空間"
        },
        {
          "id": "aud-035",
          "name": "觀眾席三號門入口",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/aud-035-preview.webp",
            "mid": "pano/20260823-v1/aud-035-mid.webp",
            "full": "pano/20260823-v1/aud-035-full.webp"
          },
          "source": "CAM_20260820150430_0035_D.JPG",
          "description": "音樂廳入口兩道門之間的空間通常被稱為「聲閘」（Acoustic Airlock / Sound Lock）。\n核心功能隔絕噪音：防止大廳的交談聲、腳步聲漏進場內。\n阻絕光線：避免開門時外面的光線影響場內照明。\n維持氣壓：穩定音樂廳內的空調與氣流。\n其他常見稱呼：隔音緩衝區、聲音前廳（Sound Vestibule）。",
          "hotspots": [],
          "links": [
            {
              "to": "aud-030",
              "yaw": 65.44,
              "pitch": -7.23
            },
            {
              "to": "lob-25",
              "yaw": 1.12,
              "pitch": 0.11
            }
          ],
          "seat": "1F-20-13",
          "spaceType": "走道或銜接空間"
        },
        {
          "id": "aud-036",
          "name": "觀眾席二樓 36",
          "floor": "2F",
          "heading": 63,
          "images": {
            "preview": "pano/20260823-v1/aud-036-preview.webp",
            "mid": "pano/20260823-v1/aud-036-mid.webp",
            "full": "pano/20260823-v1/aud-036-full.webp"
          },
          "source": "CAM_20260820150533_0036_D.JPG",
          "description": "",
          "hotspots": [
            {
              "id": "1787446939278-pyaiu",
              "title": "七號門",
              "body": "觀眾席七號門",
              "yaw": 19.31,
              "pitch": -8.13
            }
          ],
          "links": [
            {
              "to": "aud-037",
              "yaw": 184.58,
              "pitch": -9.42
            },
            {
              "to": "aud-038",
              "yaw": 177,
              "pitch": -2.59
            },
            {
              "to": "aud-044",
              "yaw": 207.65,
              "pitch": 4.67
            },
            {
              "to": "aud-047",
              "yaw": 224.56,
              "pitch": 16.56
            },
            {
              "to": "aud-046",
              "yaw": 263.05,
              "pitch": 23.79
            },
            {
              "to": "aud-045",
              "yaw": 268.56,
              "pitch": 11.49
            },
            {
              "to": "aud-043",
              "yaw": 189.86,
              "pitch": 4.73
            },
            {
              "to": "aud-048",
              "yaw": 199.78,
              "pitch": 11.29
            },
            {
              "to": "aud-001",
              "yaw": 98.51,
              "pitch": -26.79
            },
            {
              "to": "aud-002",
              "yaw": 122.15,
              "pitch": -21.69
            },
            {
              "to": "aud-003",
              "yaw": 133.26,
              "pitch": -16.63
            },
            {
              "to": "aud-005",
              "yaw": 147.66,
              "pitch": -16.86
            }
          ],
          "seat": "2F-1-37"
        },
        {
          "id": "aud-037",
          "name": "觀眾席二樓 37",
          "floor": "2F",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/aud-037-preview.webp",
            "mid": "pano/20260823-v1/aud-037-mid.webp",
            "full": "pano/20260823-v1/aud-037-full.webp"
          },
          "source": "CAM_20260820150602_0037_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-038",
              "yaw": 187.77,
              "pitch": -5.87
            },
            {
              "to": "aud-043",
              "yaw": 205.69,
              "pitch": 5.28
            },
            {
              "to": "aud-048",
              "yaw": 221.79,
              "pitch": 14.86
            },
            {
              "to": "aud-044",
              "yaw": 270.76,
              "pitch": 7.74
            },
            {
              "to": "aud-047",
              "yaw": 273.43,
              "pitch": 20.73
            },
            {
              "to": "aud-046",
              "yaw": 309.42,
              "pitch": 21.61
            },
            {
              "to": "aud-045",
              "yaw": 338.02,
              "pitch": 7.87
            },
            {
              "to": "aud-036",
              "yaw": 9.48,
              "pitch": -7.39
            },
            {
              "to": "aud-001",
              "yaw": 93.15,
              "pitch": -26.08
            },
            {
              "to": "aud-002",
              "yaw": 118.99,
              "pitch": -23.3
            },
            {
              "to": "aud-003",
              "yaw": 137.3,
              "pitch": -18.62
            }
          ],
          "seat": "2F-1-23"
        },
        {
          "id": "aud-038",
          "name": "觀眾席二樓 38",
          "floor": "2F",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/aud-038-preview.webp",
            "mid": "pano/20260823-v1/aud-038-mid.webp",
            "full": "pano/20260823-v1/aud-038-full.webp"
          },
          "source": "CAM_20260820150634_0038_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-051",
              "yaw": 92.79,
              "pitch": -37.76
            },
            {
              "to": "aud-039",
              "yaw": 178.1,
              "pitch": -4.84
            },
            {
              "to": "aud-042",
              "yaw": 200.37,
              "pitch": 7
            },
            {
              "to": "aud-049",
              "yaw": 214.11,
              "pitch": 14.49
            },
            {
              "to": "aud-043",
              "yaw": 271.4,
              "pitch": 11.81
            },
            {
              "to": "aud-048",
              "yaw": 272.36,
              "pitch": 21.4
            },
            {
              "to": "aud-047",
              "yaw": 321.68,
              "pitch": 15.28
            },
            {
              "to": "aud-044",
              "yaw": 343.29,
              "pitch": 5.1
            },
            {
              "to": "aud-037",
              "yaw": 3.79,
              "pitch": -5.67
            },
            {
              "to": "aud-001",
              "yaw": 67.57,
              "pitch": -24.29
            },
            {
              "to": "aud-002",
              "yaw": 93.32,
              "pitch": -26.25
            },
            {
              "to": "aud-003",
              "yaw": 117.99,
              "pitch": -22.93
            }
          ],
          "seat": "2F-1-2"
        },
        {
          "id": "aud-039",
          "name": "觀眾席二樓 39",
          "floor": "2F",
          "heading": 94,
          "images": {
            "preview": "pano/20260823-v1/aud-039-preview.webp",
            "mid": "pano/20260823-v1/aud-039-mid.webp",
            "full": "pano/20260823-v1/aud-039-full.webp"
          },
          "source": "CAM_20260820150704_0039_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-040",
              "yaw": 169.74,
              "pitch": -9.02
            },
            {
              "to": "aud-041",
              "yaw": 202.52,
              "pitch": 10.21
            },
            {
              "to": "aud-050",
              "yaw": 226.97,
              "pitch": 22.77
            },
            {
              "to": "aud-042",
              "yaw": 276.84,
              "pitch": 8.54
            },
            {
              "to": "aud-049",
              "yaw": 272.21,
              "pitch": 21.51
            },
            {
              "to": "aud-048",
              "yaw": 316.73,
              "pitch": 15.49
            },
            {
              "to": "aud-043",
              "yaw": 336.36,
              "pitch": 3.66
            },
            {
              "to": "aud-038",
              "yaw": 351.42,
              "pitch": -6.11
            },
            {
              "to": "aud-051",
              "yaw": 6.65,
              "pitch": -9.25
            },
            {
              "to": "aud-001",
              "yaw": 44.42,
              "pitch": -19.8
            },
            {
              "to": "aud-002",
              "yaw": 62.67,
              "pitch": -24.79
            },
            {
              "to": "aud-003",
              "yaw": 89.49,
              "pitch": -26.45
            }
          ],
          "seat": "2F-1-24"
        },
        {
          "id": "aud-040",
          "name": "觀眾席二樓 40",
          "floor": "2F",
          "heading": 103,
          "images": {
            "preview": "pano/20260823-v1/aud-040-preview.webp",
            "mid": "pano/20260823-v1/aud-040-mid.webp",
            "full": "pano/20260823-v1/aud-040-full.webp"
          },
          "source": "CAM_20260820150742_0040_D.JPG",
          "description": "",
          "hotspots": [
            {
              "id": "1787447004504-io0do",
              "title": "十號門",
              "body": "觀眾席十號門",
              "yaw": 150.18,
              "pitch": -6.18
            }
          ],
          "links": [
            {
              "to": "aud-041",
              "yaw": 263.87,
              "pitch": 12.26
            },
            {
              "to": "aud-050",
              "yaw": 267.5,
              "pitch": 23.37
            },
            {
              "to": "aud-049",
              "yaw": 301.79,
              "pitch": 16.5
            },
            {
              "to": "aud-042",
              "yaw": 321.37,
              "pitch": 4.07
            },
            {
              "to": "aud-039",
              "yaw": 342.75,
              "pitch": -9.39
            },
            {
              "to": "aud-048",
              "yaw": 329.94,
              "pitch": 9.44
            },
            {
              "to": "aud-043",
              "yaw": 340.01,
              "pitch": 3.5
            },
            {
              "to": "aud-038",
              "yaw": 352.41,
              "pitch": -3.99
            },
            {
              "to": "aud-051",
              "yaw": 1.18,
              "pitch": -6.54
            },
            {
              "to": "aud-001",
              "yaw": 37.26,
              "pitch": -17.41
            },
            {
              "to": "aud-002",
              "yaw": 49.73,
              "pitch": -22.78
            },
            {
              "to": "aud-003",
              "yaw": 73.87,
              "pitch": -26.64
            }
          ],
          "seat": "2F-1-38"
        },
        {
          "id": "aud-041",
          "name": "觀眾席二樓 41",
          "floor": "2F",
          "heading": 117,
          "images": {
            "preview": "pano/20260823-v1/aud-041-preview.webp",
            "mid": "pano/20260823-v1/aud-041-mid.webp",
            "full": "pano/20260823-v1/aud-041-full.webp"
          },
          "source": "CAM_20260820150819_0041_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-040",
              "yaw": 98.96,
              "pitch": -36.23
            },
            {
              "to": "aud-050",
              "yaw": 279.93,
              "pitch": 20.19
            },
            {
              "to": "aud-049",
              "yaw": 334.01,
              "pitch": 7.24
            },
            {
              "to": "aud-042",
              "yaw": 358.52,
              "pitch": -9.11
            },
            {
              "to": "aud-039",
              "yaw": 26.68,
              "pitch": -18.91
            },
            {
              "to": "aud-048",
              "yaw": 353.21,
              "pitch": 4.6
            },
            {
              "to": "aud-043",
              "yaw": 6.27,
              "pitch": -4.46
            },
            {
              "to": "aud-038",
              "yaw": 17.53,
              "pitch": -9.2
            },
            {
              "to": "aud-001",
              "yaw": 54.83,
              "pitch": -18.91
            },
            {
              "to": "aud-002",
              "yaw": 66.54,
              "pitch": -24.23
            },
            {
              "to": "aud-003",
              "yaw": 86.76,
              "pitch": -25.43
            }
          ],
          "seat": "2F-4-38"
        },
        {
          "id": "aud-042",
          "name": "觀眾席二樓 42",
          "floor": "2F",
          "heading": 98,
          "images": {
            "preview": "pano/20260823-v1/aud-042-preview.webp",
            "mid": "pano/20260823-v1/aud-042-mid.webp",
            "full": "pano/20260823-v1/aud-042-full.webp"
          },
          "source": "CAM_20260820150851_0042_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-039",
              "yaw": 90.18,
              "pitch": -37.81
            },
            {
              "to": "aud-040",
              "yaw": 142.01,
              "pitch": -17.04
            },
            {
              "to": "aud-041",
              "yaw": 173.17,
              "pitch": -6.78
            },
            {
              "to": "aud-050",
              "yaw": 206.72,
              "pitch": 14.7
            },
            {
              "to": "aud-049",
              "yaw": 271.74,
              "pitch": 16.67
            },
            {
              "to": "aud-048",
              "yaw": 339.2,
              "pitch": 5.32
            },
            {
              "to": "aud-043",
              "yaw": 356.12,
              "pitch": -6.16
            },
            {
              "to": "aud-038",
              "yaw": 15.69,
              "pitch": -13.51
            },
            {
              "to": "aud-051",
              "yaw": 22.06,
              "pitch": -11.47
            },
            {
              "to": "aud-001",
              "yaw": 52.83,
              "pitch": -20.78
            },
            {
              "to": "aud-002",
              "yaw": 70.16,
              "pitch": -24.65
            },
            {
              "to": "aud-003",
              "yaw": 90.8,
              "pitch": -25.78
            }
          ],
          "seat": "2F-4-24"
        },
        {
          "id": "aud-043",
          "name": "觀眾席二樓 43",
          "floor": "2F",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/aud-043-preview.webp",
            "mid": "pano/20260823-v1/aud-043-mid.webp",
            "full": "pano/20260823-v1/aud-043-full.webp"
          },
          "source": "CAM_20260820150921_0043_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-038",
              "yaw": 88.21,
              "pitch": -36.74
            },
            {
              "to": "aud-039",
              "yaw": 152.76,
              "pitch": -12.8
            },
            {
              "to": "aud-042",
              "yaw": 174.37,
              "pitch": -6.34
            },
            {
              "to": "aud-049",
              "yaw": 194.01,
              "pitch": 7.47
            },
            {
              "to": "aud-048",
              "yaw": 266.6,
              "pitch": 16.93
            },
            {
              "to": "aud-047",
              "yaw": 338.11,
              "pitch": 6.97
            },
            {
              "to": "aud-044",
              "yaw": 2.06,
              "pitch": -6.25
            },
            {
              "to": "aud-037",
              "yaw": 22.41,
              "pitch": -15.07
            },
            {
              "to": "aud-001",
              "yaw": 67.14,
              "pitch": -21.9
            },
            {
              "to": "aud-002",
              "yaw": 87.96,
              "pitch": -24.86
            },
            {
              "to": "aud-003",
              "yaw": 108.79,
              "pitch": -22.69
            }
          ],
          "seat": "2F-4-2"
        },
        {
          "id": "aud-044",
          "name": "觀眾席二樓 44",
          "floor": "2F",
          "heading": 80,
          "images": {
            "preview": "pano/20260823-v1/aud-044-preview.webp",
            "mid": "pano/20260823-v1/aud-044-mid.webp",
            "full": "pano/20260823-v1/aud-044-full.webp"
          },
          "source": "CAM_20260820150953_0044_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-037",
              "yaw": 98.59,
              "pitch": -37.05
            },
            {
              "to": "aud-038",
              "yaw": 165.18,
              "pitch": -12.57
            },
            {
              "to": "aud-051",
              "yaw": 153.63,
              "pitch": -14.59
            },
            {
              "to": "aud-043",
              "yaw": 185.56,
              "pitch": -5.69
            },
            {
              "to": "aud-048",
              "yaw": 201.16,
              "pitch": 5.54
            },
            {
              "to": "aud-042",
              "yaw": 180.06,
              "pitch": -0.82
            },
            {
              "to": "aud-047",
              "yaw": 267.45,
              "pitch": 15.34
            },
            {
              "to": "aud-046",
              "yaw": 334.71,
              "pitch": 13.15
            },
            {
              "to": "aud-045",
              "yaw": 9.82,
              "pitch": -7.7
            },
            {
              "to": "aud-036",
              "yaw": 38.98,
              "pitch": -18.45
            },
            {
              "to": "aud-001",
              "yaw": 91.42,
              "pitch": -24.49
            },
            {
              "to": "aud-002",
              "yaw": 113.16,
              "pitch": -23.52
            },
            {
              "to": "aud-003",
              "yaw": 129,
              "pitch": -19.91
            }
          ],
          "seat": "2F-4-23"
        },
        {
          "id": "aud-045",
          "name": "觀眾席二樓 45",
          "floor": "2F",
          "heading": 77,
          "images": {
            "preview": "pano/20260823-v1/aud-045-preview.webp",
            "mid": "pano/20260823-v1/aud-045-mid.webp",
            "full": "pano/20260823-v1/aud-045-full.webp"
          },
          "source": "CAM_20260820151017_0045_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-036",
              "yaw": 86.34,
              "pitch": -35.14
            },
            {
              "to": "aud-037",
              "yaw": 156.27,
              "pitch": -23.09
            },
            {
              "to": "aud-044",
              "yaw": 191.7,
              "pitch": -8.06
            },
            {
              "to": "aud-038",
              "yaw": 171.81,
              "pitch": -8.78
            },
            {
              "to": "aud-043",
              "yaw": 186.8,
              "pitch": -2.25
            },
            {
              "to": "aud-048",
              "yaw": 197.89,
              "pitch": 5.16
            },
            {
              "to": "aud-047",
              "yaw": 214.77,
              "pitch": 9.5
            },
            {
              "to": "aud-046",
              "yaw": 271,
              "pitch": 20.8
            },
            {
              "to": "aud-001",
              "yaw": 103.55,
              "pitch": -24.68
            },
            {
              "to": "aud-002",
              "yaw": 123.46,
              "pitch": -21.54
            },
            {
              "to": "aud-003",
              "yaw": 135.44,
              "pitch": -17.84
            }
          ],
          "seat": "2F-4-37"
        },
        {
          "id": "aud-046",
          "name": "觀眾席二樓 46",
          "floor": "2F",
          "heading": 72,
          "images": {
            "preview": "pano/20260823-v1/aud-046-preview.webp",
            "mid": "pano/20260823-v1/aud-046-mid.webp",
            "full": "pano/20260823-v1/aud-046-full.webp"
          },
          "source": "CAM_20260820151050_0046_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-045",
              "yaw": 74.65,
              "pitch": -42.29
            },
            {
              "to": "aud-036",
              "yaw": 81.7,
              "pitch": -31.26
            },
            {
              "to": "aud-037",
              "yaw": 134.16,
              "pitch": -24.15
            },
            {
              "to": "aud-044",
              "yaw": 162.03,
              "pitch": -16.72
            },
            {
              "to": "aud-047",
              "yaw": 183.96,
              "pitch": -7.54
            },
            {
              "to": "aud-048",
              "yaw": 177.89,
              "pitch": -1.17
            },
            {
              "to": "aud-038",
              "yaw": 154.1,
              "pitch": -13.68
            },
            {
              "to": "aud-003",
              "yaw": 123.84,
              "pitch": -18.59
            },
            {
              "to": "aud-002",
              "yaw": 111.62,
              "pitch": -23.37
            },
            {
              "to": "aud-001",
              "yaw": 94.51,
              "pitch": -25.34
            }
          ],
          "seat": "2F-7-37"
        },
        {
          "id": "aud-047",
          "name": "觀眾席二樓 47",
          "floor": "2F",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/aud-047-preview.webp",
            "mid": "pano/20260823-v1/aud-047-mid.webp",
            "full": "pano/20260823-v1/aud-047-full.webp"
          },
          "source": "CAM_20260820151152_0047_D.JPG",
          "description": "",
          "hotspots": [
            {
              "id": "1787447049720-nprsj",
              "title": "八號門",
              "body": "觀眾席八號門",
              "yaw": 303.62,
              "pitch": 14.09
            }
          ],
          "links": [
            {
              "to": "aud-044",
              "yaw": 96.61,
              "pitch": -41.9
            },
            {
              "to": "aud-037",
              "yaw": 95.28,
              "pitch": -32.58
            },
            {
              "to": "aud-038",
              "yaw": 157.22,
              "pitch": -16.32
            },
            {
              "to": "aud-043",
              "yaw": 173.33,
              "pitch": -11.1
            },
            {
              "to": "aud-048",
              "yaw": 188.61,
              "pitch": -4.22
            },
            {
              "to": "aud-046",
              "yaw": 354.74,
              "pitch": 2.84
            },
            {
              "to": "aud-045",
              "yaw": 30.87,
              "pitch": -15.85
            },
            {
              "to": "aud-036",
              "yaw": 53.52,
              "pitch": -23.75
            },
            {
              "to": "aud-001",
              "yaw": 93.75,
              "pitch": -23.43
            },
            {
              "to": "aud-002",
              "yaw": 113.14,
              "pitch": -23.31
            },
            {
              "to": "aud-003",
              "yaw": 127.03,
              "pitch": -20.74
            }
          ],
          "seat": "2F-6-23"
        },
        {
          "id": "aud-048",
          "name": "觀眾席二樓 48",
          "floor": "2F",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/aud-048-preview.webp",
            "mid": "pano/20260823-v1/aud-048-mid.webp",
            "full": "pano/20260823-v1/aud-048-full.webp"
          },
          "source": "CAM_20260820151225_0048_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-043",
              "yaw": 92.39,
              "pitch": -49.55
            },
            {
              "to": "aud-038",
              "yaw": 92.83,
              "pitch": -33.87
            },
            {
              "to": "aud-039",
              "yaw": 146.42,
              "pitch": -17.67
            },
            {
              "to": "aud-042",
              "yaw": 161.88,
              "pitch": -13.6
            },
            {
              "to": "aud-049",
              "yaw": 179.3,
              "pitch": -4.21
            },
            {
              "to": "aud-047",
              "yaw": 3.15,
              "pitch": -3.7
            },
            {
              "to": "aud-044",
              "yaw": 21.08,
              "pitch": -12.74
            },
            {
              "to": "aud-037",
              "yaw": 37.52,
              "pitch": -18.37
            },
            {
              "to": "aud-001",
              "yaw": 72.32,
              "pitch": -23.35
            },
            {
              "to": "aud-002",
              "yaw": 92.95,
              "pitch": -24.84
            },
            {
              "to": "aud-003",
              "yaw": 111.1,
              "pitch": -23.29
            }
          ],
          "seat": "2F-6-2"
        },
        {
          "id": "aud-049",
          "name": "觀眾席二樓 49",
          "floor": "2F",
          "heading": 97,
          "images": {
            "preview": "pano/20260823-v1/aud-049-preview.webp",
            "mid": "pano/20260823-v1/aud-049-mid.webp",
            "full": "pano/20260823-v1/aud-049-full.webp"
          },
          "source": "CAM_20260820151255_0049_D.JPG",
          "description": "",
          "hotspots": [
            {
              "id": "1787447031899-8fc1y",
              "title": "九號門",
              "body": "觀眾席九號門",
              "yaw": 241.2,
              "pitch": 14
            }
          ],
          "links": [
            {
              "to": "aud-042",
              "yaw": 90.4,
              "pitch": -44.43
            },
            {
              "to": "aud-039",
              "yaw": 86.13,
              "pitch": -33.84
            },
            {
              "to": "aud-040",
              "yaw": 133.77,
              "pitch": -20.82
            },
            {
              "to": "aud-050",
              "yaw": 188.49,
              "pitch": 2.66
            },
            {
              "to": "aud-041",
              "yaw": 155.96,
              "pitch": -13.57
            },
            {
              "to": "aud-048",
              "yaw": 354.23,
              "pitch": -2.46
            },
            {
              "to": "aud-043",
              "yaw": 15.94,
              "pitch": -14.04
            },
            {
              "to": "aud-038",
              "yaw": 28.33,
              "pitch": -17.91
            },
            {
              "to": "aud-001",
              "yaw": 58.76,
              "pitch": -20.53
            },
            {
              "to": "aud-002",
              "yaw": 73.35,
              "pitch": -23.47
            },
            {
              "to": "aud-003",
              "yaw": 91.9,
              "pitch": -25.55
            }
          ],
          "seat": "2F-6-24"
        },
        {
          "id": "aud-050",
          "name": "觀眾席二樓 50",
          "floor": "2F",
          "heading": 100,
          "images": {
            "preview": "pano/20260823-v1/aud-050-preview.webp",
            "mid": "pano/20260823-v1/aud-050-mid.webp",
            "full": "pano/20260823-v1/aud-050-full.webp"
          },
          "source": "CAM_20260820151319_0050_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-041",
              "yaw": 96.79,
              "pitch": -42.84
            },
            {
              "to": "aud-040",
              "yaw": 92.04,
              "pitch": -33.85
            },
            {
              "to": "aud-039",
              "yaw": 35,
              "pitch": -24.39
            },
            {
              "to": "aud-042",
              "yaw": 14.65,
              "pitch": -19.72
            },
            {
              "to": "aud-049",
              "yaw": 347.24,
              "pitch": -7.31
            },
            {
              "to": "aud-048",
              "yaw": 354.88,
              "pitch": -1.51
            },
            {
              "to": "aud-043",
              "yaw": 9.47,
              "pitch": -10.2
            },
            {
              "to": "aud-038",
              "yaw": 19.21,
              "pitch": -13.51
            },
            {
              "to": "aud-001",
              "yaw": 49.52,
              "pitch": -20.13
            },
            {
              "to": "aud-002",
              "yaw": 61.61,
              "pitch": -23.91
            },
            {
              "to": "aud-003",
              "yaw": 79.38,
              "pitch": -25.92
            }
          ],
          "seat": "2F-7-38"
        },
        {
          "id": "aud-051",
          "name": "觀眾席二樓 51",
          "floor": "2F",
          "heading": 270,
          "images": {
            "preview": "pano/20260823-v1/aud-051-preview.webp",
            "mid": "pano/20260823-v1/aud-051-mid.webp",
            "full": "pano/20260823-v1/aud-051-full.webp"
          },
          "source": "CAM_20260820151423_0051_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "aud-039",
              "yaw": 11.59,
              "pitch": -7.11
            },
            {
              "to": "aud-040",
              "yaw": 1.06,
              "pitch": -4.34
            },
            {
              "to": "aud-041",
              "yaw": 12.82,
              "pitch": 2.47
            },
            {
              "to": "aud-050",
              "yaw": 25.38,
              "pitch": 9.83
            },
            {
              "to": "aud-042",
              "yaw": 25.8,
              "pitch": 2.04
            },
            {
              "to": "aud-049",
              "yaw": 40.48,
              "pitch": 11.01
            },
            {
              "to": "aud-038",
              "yaw": 90.35,
              "pitch": -21.89
            },
            {
              "to": "aud-043",
              "yaw": 90.13,
              "pitch": 6.84
            },
            {
              "to": "aud-048",
              "yaw": 89.26,
              "pitch": 15.74
            },
            {
              "to": "aud-047",
              "yaw": 132.98,
              "pitch": 14.32
            },
            {
              "to": "aud-044",
              "yaw": 150.4,
              "pitch": 4.22
            },
            {
              "to": "aud-037",
              "yaw": 166.18,
              "pitch": -6.41
            },
            {
              "to": "aud-046",
              "yaw": 152.18,
              "pitch": 12.52
            },
            {
              "to": "aud-045",
              "yaw": 164.39,
              "pitch": 4.73
            },
            {
              "to": "aud-036",
              "yaw": 178.39,
              "pitch": -3.25
            },
            {
              "to": "aud-001",
              "yaw": 243.55,
              "pitch": -25.86
            },
            {
              "to": "aud-007",
              "yaw": 234.07,
              "pitch": -30.4
            },
            {
              "to": "aud-008",
              "yaw": 222.44,
              "pitch": -23.8
            },
            {
              "to": "aud-009",
              "yaw": 207.73,
              "pitch": -25.01
            },
            {
              "to": "aud-010",
              "yaw": 215.73,
              "pitch": -35.15
            },
            {
              "to": "aud-018",
              "yaw": 193.27,
              "pitch": -25.37
            },
            {
              "to": "aud-017",
              "yaw": 195.02,
              "pitch": -38.24
            },
            {
              "to": "aud-002",
              "yaw": 269.17,
              "pitch": -28.53
            },
            {
              "to": "aud-006",
              "yaw": 269.55,
              "pitch": -37.27
            },
            {
              "to": "aud-011",
              "yaw": 267.67,
              "pitch": -54.91
            },
            {
              "to": "aud-003",
              "yaw": 296.56,
              "pitch": -25.54
            },
            {
              "to": "aud-005",
              "yaw": 307.58,
              "pitch": -30.41
            },
            {
              "to": "aud-012",
              "yaw": 324.59,
              "pitch": -36.43
            },
            {
              "to": "aud-015",
              "yaw": 341.38,
              "pitch": -39.02
            },
            {
              "to": "aud-004",
              "yaw": 315.82,
              "pitch": -24.63
            },
            {
              "to": "aud-013",
              "yaw": 330.37,
              "pitch": -26.7
            },
            {
              "to": "aud-014",
              "yaw": 342.8,
              "pitch": -26.92
            },
            {
              "to": "aud-016",
              "yaw": 267.32,
              "pitch": -75.54
            }
          ],
          "seat": "2F-1-6"
        }
      ],
      "boundaries": [
        {
          "node": "aud-001",
          "to": "stage",
          "toNode": "stg-001",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-001",
          "to": "stage",
          "toNode": "stg-002",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-001",
          "to": "stage",
          "toNode": "stg-003",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-001",
          "to": "stage",
          "toNode": "stg-008",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-001",
          "to": "stage",
          "toNode": "stg-007",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-001",
          "to": "stage",
          "toNode": "stg-006",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-001",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-002",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-003",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-004",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-005",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-006",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-007",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-002",
          "to": "stage",
          "toNode": "stg-008",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-003",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-002",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-001",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-004",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-005",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-006",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-003",
          "to": "stage",
          "toNode": "stg-007",
          "label": "前往舞台與貴賓室"
        },
        {
          "node": "aud-034",
          "to": "lobby",
          "toNode": "lob-29",
          "label": "前往音樂廳前廳"
        },
        {
          "node": "aud-035",
          "to": "lobby",
          "toNode": "lob-25",
          "label": "前往音樂廳前廳"
        }
      ],
      "updatedAt": "2026-08-23"
    },
    {
      "id": "stage",
      "name": "舞台與貴賓室",
      "order": 3,
      "status": "ready",
      "photoCount": 17,
      "sourcePhotos": 17,
      "nodes": [
        {
          "id": "stg-001",
          "name": "舞台、樂池與貴賓室 01",
          "floor": "1F",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/stg-001-preview.webp",
            "mid": "pano/20260823-v1/stg-001-mid.webp",
            "full": "pano/20260823-v1/stg-001-full.webp"
          },
          "source": "CAM_20260820151540_0052_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-002",
              "yaw": 170.02,
              "pitch": -27.38
            },
            {
              "to": "stg-003",
              "yaw": 174.1,
              "pitch": -7.65
            },
            {
              "to": "stg-004",
              "yaw": 159.88,
              "pitch": 0.19
            },
            {
              "to": "stg-005",
              "yaw": 148.2,
              "pitch": -2.84
            },
            {
              "to": "stg-006",
              "yaw": 121.31,
              "pitch": -5.47
            },
            {
              "to": "stg-007",
              "yaw": 82.9,
              "pitch": -7.86
            },
            {
              "to": "stg-008",
              "yaw": 41.52,
              "pitch": -5.57
            },
            {
              "to": "aud-001",
              "yaw": 311.03,
              "pitch": -19.95
            },
            {
              "to": "aud-007",
              "yaw": 289.35,
              "pitch": 0.95
            },
            {
              "to": "aud-008",
              "yaw": 314.16,
              "pitch": 0.74
            },
            {
              "to": "aud-002",
              "yaw": 218.27,
              "pitch": -6.73
            },
            {
              "to": "aud-006",
              "yaw": 237.38,
              "pitch": -0.06
            },
            {
              "to": "aud-011",
              "yaw": 248.89,
              "pitch": 4.5
            },
            {
              "to": "aud-010",
              "yaw": 282.13,
              "pitch": 4.56
            },
            {
              "to": "aud-003",
              "yaw": 194.6,
              "pitch": -2.38
            },
            {
              "to": "aud-005",
              "yaw": 212.83,
              "pitch": 1.64
            },
            {
              "to": "aud-012",
              "yaw": 222.23,
              "pitch": 4.08
            },
            {
              "to": "aud-038",
              "yaw": 254.39,
              "pitch": 18.83
            },
            {
              "to": "aud-039",
              "yaw": 232.91,
              "pitch": 16.92
            },
            {
              "to": "aud-037",
              "yaw": 278.03,
              "pitch": 18.71
            },
            {
              "to": "aud-036",
              "yaw": 294.36,
              "pitch": 18.36
            },
            {
              "to": "aud-040",
              "yaw": 220.71,
              "pitch": 16.13
            },
            {
              "to": "stg-015",
              "yaw": 29.35,
              "pitch": 14.51
            },
            {
              "to": "aud-035",
              "yaw": 268.88,
              "pitch": 8.69
            },
            {
              "to": "aud-034",
              "yaw": 248.44,
              "pitch": 9.49
            }
          ],
          "plan": {
            "x": 0.3653,
            "y": 0.2792
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-002",
          "name": "舞台、樂池與貴賓室 02",
          "floor": "1F",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/stg-002-preview.webp",
            "mid": "pano/20260823-v1/stg-002-mid.webp",
            "full": "pano/20260823-v1/stg-002-full.webp"
          },
          "source": "CAM_20260820151604_0053_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-001",
              "yaw": 359.64,
              "pitch": -14.76
            },
            {
              "to": "stg-008",
              "yaw": 25.08,
              "pitch": -3.3
            },
            {
              "to": "stg-007",
              "yaw": 56.06,
              "pitch": -6.73
            },
            {
              "to": "stg-006",
              "yaw": 91.12,
              "pitch": -8.35
            },
            {
              "to": "stg-005",
              "yaw": 128.91,
              "pitch": -5.86
            },
            {
              "to": "stg-004",
              "yaw": 154.42,
              "pitch": -2.1
            },
            {
              "to": "stg-003",
              "yaw": 178.62,
              "pitch": -13.55
            },
            {
              "to": "aud-003",
              "yaw": 210.88,
              "pitch": -4.39
            },
            {
              "to": "aud-005",
              "yaw": 227.34,
              "pitch": 1.56
            },
            {
              "to": "aud-012",
              "yaw": 240.89,
              "pitch": 5.3
            },
            {
              "to": "aud-002",
              "yaw": 271.54,
              "pitch": -8.59
            },
            {
              "to": "aud-006",
              "yaw": 271.31,
              "pitch": -0.06
            },
            {
              "to": "aud-011",
              "yaw": 271.25,
              "pitch": 5.87
            },
            {
              "to": "aud-010",
              "yaw": 299.56,
              "pitch": 4.4
            },
            {
              "to": "aud-007",
              "yaw": 315.02,
              "pitch": 0.36
            },
            {
              "to": "aud-001",
              "yaw": 335.2,
              "pitch": -7.38
            },
            {
              "to": "aud-036",
              "yaw": 306.94,
              "pitch": 17.03
            },
            {
              "to": "aud-037",
              "yaw": 293.27,
              "pitch": 18.12
            },
            {
              "to": "aud-038",
              "yaw": 271.05,
              "pitch": 18.96
            },
            {
              "to": "aud-039",
              "yaw": 249.87,
              "pitch": 17.99
            },
            {
              "to": "aud-040",
              "yaw": 236.99,
              "pitch": 17.43
            },
            {
              "to": "stg-015",
              "yaw": 22.48,
              "pitch": 10.93
            },
            {
              "to": "aud-034",
              "yaw": 259.94,
              "pitch": 8.48
            },
            {
              "to": "aud-035",
              "yaw": 280.96,
              "pitch": 8.34
            }
          ],
          "plan": {
            "x": 0.4963,
            "y": 0.2838
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-003",
          "name": "舞台、樂池與貴賓室 03",
          "floor": "1F",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/stg-003-preview.webp",
            "mid": "pano/20260823-v1/stg-003-mid.webp",
            "full": "pano/20260823-v1/stg-003-full.webp"
          },
          "source": "CAM_20260820151630_0054_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-002",
              "yaw": 0.53,
              "pitch": -24.16
            },
            {
              "to": "stg-001",
              "yaw": 0.47,
              "pitch": -7.85
            },
            {
              "to": "stg-008",
              "yaw": 13.75,
              "pitch": -1.92
            },
            {
              "to": "stg-007",
              "yaw": 20.17,
              "pitch": -3.28
            },
            {
              "to": "stg-006",
              "yaw": 35.03,
              "pitch": -5.69
            },
            {
              "to": "stg-005",
              "yaw": 93.16,
              "pitch": -9.5
            },
            {
              "to": "stg-004",
              "yaw": 133.85,
              "pitch": -4.15
            },
            {
              "to": "aud-003",
              "yaw": 226.17,
              "pitch": -7.88
            },
            {
              "to": "aud-005",
              "yaw": 243.83,
              "pitch": 1.11
            },
            {
              "to": "aud-004",
              "yaw": 222.56,
              "pitch": 2.23
            },
            {
              "to": "aud-012",
              "yaw": 249.6,
              "pitch": 4.07
            },
            {
              "to": "aud-011",
              "yaw": 283.76,
              "pitch": 4.44
            },
            {
              "to": "aud-006",
              "yaw": 295.59,
              "pitch": -0.77
            },
            {
              "to": "aud-002",
              "yaw": 311.02,
              "pitch": -9.23
            },
            {
              "to": "aud-001",
              "yaw": 340.17,
              "pitch": -4.84
            },
            {
              "to": "aud-007",
              "yaw": 324.45,
              "pitch": 0.6
            },
            {
              "to": "aud-010",
              "yaw": 311.65,
              "pitch": 3.55
            },
            {
              "to": "aud-036",
              "yaw": 313.23,
              "pitch": 14.73
            },
            {
              "to": "aud-037",
              "yaw": 298.72,
              "pitch": 16.64
            },
            {
              "to": "aud-038",
              "yaw": 281,
              "pitch": 18.44
            },
            {
              "to": "aud-039",
              "yaw": 258.08,
              "pitch": 19.1
            },
            {
              "to": "aud-040",
              "yaw": 242.9,
              "pitch": 18.51
            },
            {
              "to": "stg-015",
              "yaw": 11.64,
              "pitch": 6.42
            },
            {
              "to": "aud-035",
              "yaw": 287.99,
              "pitch": 9.39
            },
            {
              "to": "aud-034",
              "yaw": 265.87,
              "pitch": 9.29
            }
          ],
          "plan": {
            "x": 0.6336,
            "y": 0.2749
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-004",
          "name": "舞台、樂池與貴賓室 04",
          "floor": "1F",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/stg-004-preview.webp",
            "mid": "pano/20260823-v1/stg-004-mid.webp",
            "full": "pano/20260823-v1/stg-004-full.webp"
          },
          "source": "CAM_20260820151710_0055_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-005",
              "yaw": 356.79,
              "pitch": -26.47
            },
            {
              "to": "stg-006",
              "yaw": 359.07,
              "pitch": -12.51
            },
            {
              "to": "stg-008",
              "yaw": 357.75,
              "pitch": -5.49
            },
            {
              "to": "stg-009",
              "yaw": 16.66,
              "pitch": -5.86
            },
            {
              "to": "stg-014",
              "yaw": 33.12,
              "pitch": -5.33
            },
            {
              "to": "stg-010",
              "yaw": 22.28,
              "pitch": -12.51
            },
            {
              "to": "stg-013",
              "yaw": 52.12,
              "pitch": -8.11
            },
            {
              "to": "stg-011",
              "yaw": 89.65,
              "pitch": -29.53
            },
            {
              "to": "stg-012",
              "yaw": 84.02,
              "pitch": -10.05
            },
            {
              "to": "aud-003",
              "yaw": 263.96,
              "pitch": -15.15
            },
            {
              "to": "aud-005",
              "yaw": 266.43,
              "pitch": -3.9
            },
            {
              "to": "aud-004",
              "yaw": 246.19,
              "pitch": -3.96
            },
            {
              "to": "aud-013",
              "yaw": 251.25,
              "pitch": -0.32
            },
            {
              "to": "aud-002",
              "yaw": 313.56,
              "pitch": -9.53
            },
            {
              "to": "aud-006",
              "yaw": 298.54,
              "pitch": -3.48
            },
            {
              "to": "aud-001",
              "yaw": 333.49,
              "pitch": -7.58
            },
            {
              "to": "aud-007",
              "yaw": 319.8,
              "pitch": -2.68
            },
            {
              "to": "aud-036",
              "yaw": 310.55,
              "pitch": 10.97
            },
            {
              "to": "aud-037",
              "yaw": 301.39,
              "pitch": 11.39
            },
            {
              "to": "aud-038",
              "yaw": 287.4,
              "pitch": 13.47
            },
            {
              "to": "aud-039",
              "yaw": 268.25,
              "pitch": 13.87
            },
            {
              "to": "aud-040",
              "yaw": 253.18,
              "pitch": 14.61
            }
          ],
          "plan": {
            "x": 0.6315,
            "y": 0.2254
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-005",
          "name": "舞台、樂池與貴賓室 05",
          "floor": "1F",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/stg-005-preview.webp",
            "mid": "pano/20260823-v1/stg-005-mid.webp",
            "full": "pano/20260823-v1/stg-005-full.webp"
          },
          "source": "CAM_20260820151732_0056_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-004",
              "yaw": 178.37,
              "pitch": -20.72
            },
            {
              "to": "stg-011",
              "yaw": 134.75,
              "pitch": -16.62
            },
            {
              "to": "stg-012",
              "yaw": 106.36,
              "pitch": -10.14
            },
            {
              "to": "stg-013",
              "yaw": 66.71,
              "pitch": -9.97
            },
            {
              "to": "stg-014",
              "yaw": 39.8,
              "pitch": -7.81
            },
            {
              "to": "stg-010",
              "yaw": 38.55,
              "pitch": -19.27
            },
            {
              "to": "stg-006",
              "yaw": 357.75,
              "pitch": -21.32
            },
            {
              "to": "stg-007",
              "yaw": 358.11,
              "pitch": -12.22
            },
            {
              "to": "stg-008",
              "yaw": 358.95,
              "pitch": -6.68
            },
            {
              "to": "stg-009",
              "yaw": 20.42,
              "pitch": -9.09
            },
            {
              "to": "stg-001",
              "yaw": 340.28,
              "pitch": -14.24
            },
            {
              "to": "stg-002",
              "yaw": 270.71,
              "pitch": -33.89
            },
            {
              "to": "stg-003",
              "yaw": 218.67,
              "pitch": -23.05
            },
            {
              "to": "aud-003",
              "yaw": 240.78,
              "pitch": -12.47
            },
            {
              "to": "aud-002",
              "yaw": 295.63,
              "pitch": -11.54
            },
            {
              "to": "aud-001",
              "yaw": 325.08,
              "pitch": -8.14
            },
            {
              "to": "aud-007",
              "yaw": 313.86,
              "pitch": -3.16
            },
            {
              "to": "aud-006",
              "yaw": 284.67,
              "pitch": -2.71
            },
            {
              "to": "aud-005",
              "yaw": 251.3,
              "pitch": -3.19
            },
            {
              "to": "aud-004",
              "yaw": 232.87,
              "pitch": -3.01
            },
            {
              "to": "aud-040",
              "yaw": 246.51,
              "pitch": 14.31
            },
            {
              "to": "aud-039",
              "yaw": 259.04,
              "pitch": 13.76
            },
            {
              "to": "aud-038",
              "yaw": 279.18,
              "pitch": 13.29
            },
            {
              "to": "aud-037",
              "yaw": 295.4,
              "pitch": 12.24
            },
            {
              "to": "aud-036",
              "yaw": 307.62,
              "pitch": 11.16
            }
          ],
          "plan": {
            "x": 0.5671,
            "y": 0.2247
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-006",
          "name": "舞台、樂池與貴賓室 06",
          "floor": "1F",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/stg-006-preview.webp",
            "mid": "pano/20260823-v1/stg-006-mid.webp",
            "full": "pano/20260823-v1/stg-006-full.webp"
          },
          "source": "CAM_20260820151759_0057_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-010",
              "yaw": 91.22,
              "pitch": -23.7
            },
            {
              "to": "stg-013",
              "yaw": 90.67,
              "pitch": -9.06
            },
            {
              "to": "stg-012",
              "yaw": 123.58,
              "pitch": -7.67
            },
            {
              "to": "stg-011",
              "yaw": 156.48,
              "pitch": -12.53
            },
            {
              "to": "stg-004",
              "yaw": 183.81,
              "pitch": -10.42
            },
            {
              "to": "stg-005",
              "yaw": 187.3,
              "pitch": -25.24
            },
            {
              "to": "stg-003",
              "yaw": 204.06,
              "pitch": -16.82
            },
            {
              "to": "stg-002",
              "yaw": 268.8,
              "pitch": -32.15
            },
            {
              "to": "stg-001",
              "yaw": 335.58,
              "pitch": -17.39
            },
            {
              "to": "stg-007",
              "yaw": 354.84,
              "pitch": -31.13
            },
            {
              "to": "stg-008",
              "yaw": 358.04,
              "pitch": -12.44
            },
            {
              "to": "stg-009",
              "yaw": 31.73,
              "pitch": -12.42
            },
            {
              "to": "stg-014",
              "yaw": 54.55,
              "pitch": -8.15
            },
            {
              "to": "aud-001",
              "yaw": 314.36,
              "pitch": -9.6
            },
            {
              "to": "aud-002",
              "yaw": 271,
              "pitch": -13.74
            },
            {
              "to": "aud-003",
              "yaw": 225.67,
              "pitch": -7.91
            },
            {
              "to": "aud-005",
              "yaw": 237.5,
              "pitch": -3.07
            },
            {
              "to": "aud-004",
              "yaw": 224.36,
              "pitch": -0.89
            },
            {
              "to": "aud-012",
              "yaw": 246.06,
              "pitch": 1.1
            },
            {
              "to": "aud-006",
              "yaw": 270.63,
              "pitch": -4.88
            },
            {
              "to": "aud-011",
              "yaw": 270.07,
              "pitch": 1.07
            },
            {
              "to": "aud-007",
              "yaw": 304.3,
              "pitch": -4.41
            },
            {
              "to": "aud-010",
              "yaw": 295.65,
              "pitch": -0.08
            },
            {
              "to": "aud-008",
              "yaw": 317.14,
              "pitch": -1.18
            },
            {
              "to": "aud-036",
              "yaw": 302.2,
              "pitch": 11.99
            },
            {
              "to": "aud-037",
              "yaw": 288.13,
              "pitch": 12.24
            },
            {
              "to": "aud-038",
              "yaw": 270.12,
              "pitch": 12.69
            },
            {
              "to": "aud-039",
              "yaw": 250.01,
              "pitch": 12.88
            },
            {
              "to": "aud-040",
              "yaw": 238,
              "pitch": 12.7
            },
            {
              "to": "stg-015",
              "yaw": 2.03,
              "pitch": 3.71
            }
          ],
          "plan": {
            "x": 0.4942,
            "y": 0.2261
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-007",
          "name": "舞台、樂池與貴賓室 07",
          "floor": "1F",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/stg-007-preview.webp",
            "mid": "pano/20260823-v1/stg-007-mid.webp",
            "full": "pano/20260823-v1/stg-007-full.webp"
          },
          "source": "CAM_20260820151822_0058_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-008",
              "yaw": 0.94,
              "pitch": -25.5
            },
            {
              "to": "stg-009",
              "yaw": 54.8,
              "pitch": -15.48
            },
            {
              "to": "stg-014",
              "yaw": 76.42,
              "pitch": -9.5
            },
            {
              "to": "stg-013",
              "yaw": 108.08,
              "pitch": -9.86
            },
            {
              "to": "stg-006",
              "yaw": 183.95,
              "pitch": -21.03
            },
            {
              "to": "stg-010",
              "yaw": 138.57,
              "pitch": -18.21
            },
            {
              "to": "stg-012",
              "yaw": 141.56,
              "pitch": -6.21
            },
            {
              "to": "stg-011",
              "yaw": 164.93,
              "pitch": -7.47
            },
            {
              "to": "stg-004",
              "yaw": 181.81,
              "pitch": -7.63
            },
            {
              "to": "stg-003",
              "yaw": 197.99,
              "pitch": -12.09
            },
            {
              "to": "stg-002",
              "yaw": 217.11,
              "pitch": -24.22
            },
            {
              "to": "stg-001",
              "yaw": 311.1,
              "pitch": -32.58
            },
            {
              "to": "aud-001",
              "yaw": 297.27,
              "pitch": -13.58
            },
            {
              "to": "aud-002",
              "yaw": 244.33,
              "pitch": -10.37
            },
            {
              "to": "aud-003",
              "yaw": 213.24,
              "pitch": -5.56
            },
            {
              "to": "aud-005",
              "yaw": 223.2,
              "pitch": -2.62
            },
            {
              "to": "aud-006",
              "yaw": 251.84,
              "pitch": -3.84
            },
            {
              "to": "aud-007",
              "yaw": 288.11,
              "pitch": -3.8
            },
            {
              "to": "aud-008",
              "yaw": 306.89,
              "pitch": -3.64
            },
            {
              "to": "aud-031",
              "yaw": 263.07,
              "pitch": 5.61
            },
            {
              "to": "aud-030",
              "yaw": 278.75,
              "pitch": 5.02
            },
            {
              "to": "aud-035",
              "yaw": 271.9,
              "pitch": 5.51
            },
            {
              "to": "aud-034",
              "yaw": 255.61,
              "pitch": 6.03
            },
            {
              "to": "aud-032",
              "yaw": 247.27,
              "pitch": 5.22
            },
            {
              "to": "aud-033",
              "yaw": 240.8,
              "pitch": 5.9
            },
            {
              "to": "aud-029",
              "yaw": 287.07,
              "pitch": 5.66
            },
            {
              "to": "aud-040",
              "yaw": 231.78,
              "pitch": 11.6
            },
            {
              "to": "aud-039",
              "yaw": 242.77,
              "pitch": 11.97
            },
            {
              "to": "aud-038",
              "yaw": 260.49,
              "pitch": 13.03
            },
            {
              "to": "aud-037",
              "yaw": 281.32,
              "pitch": 13.34
            },
            {
              "to": "aud-036",
              "yaw": 294.46,
              "pitch": 12.81
            },
            {
              "to": "stg-015",
              "yaw": 7.34,
              "pitch": 4.22
            }
          ],
          "plan": {
            "x": 0.4131,
            "y": 0.2264
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-008",
          "name": "舞台、樂池與貴賓室 08",
          "floor": "1F",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/stg-008-preview.webp",
            "mid": "pano/20260823-v1/stg-008-mid.webp",
            "full": "pano/20260823-v1/stg-008-full.webp"
          },
          "source": "CAM_20260820151843_0059_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-009",
              "yaw": 80.53,
              "pitch": -23.08
            },
            {
              "to": "stg-014",
              "yaw": 92.2,
              "pitch": -8.97
            },
            {
              "to": "stg-013",
              "yaw": 113.66,
              "pitch": -8.63
            },
            {
              "to": "stg-006",
              "yaw": 179.51,
              "pitch": -11.07
            },
            {
              "to": "stg-010",
              "yaw": 150.31,
              "pitch": -13.49
            },
            {
              "to": "stg-012",
              "yaw": 144.95,
              "pitch": -4.9
            },
            {
              "to": "stg-011",
              "yaw": 164.4,
              "pitch": -5.66
            },
            {
              "to": "stg-004",
              "yaw": 178.72,
              "pitch": -5.1
            },
            {
              "to": "stg-003",
              "yaw": 191.36,
              "pitch": -10.03
            },
            {
              "to": "stg-002",
              "yaw": 208.56,
              "pitch": -20.78
            },
            {
              "to": "stg-001",
              "yaw": 269.57,
              "pitch": -39.25
            },
            {
              "to": "aud-001",
              "yaw": 268.66,
              "pitch": -14.06
            },
            {
              "to": "aud-007",
              "yaw": 271.33,
              "pitch": -4.73
            },
            {
              "to": "aud-008",
              "yaw": 290.83,
              "pitch": -5.06
            },
            {
              "to": "aud-002",
              "yaw": 223.44,
              "pitch": -9.94
            },
            {
              "to": "aud-006",
              "yaw": 237.45,
              "pitch": -3.46
            },
            {
              "to": "aud-003",
              "yaw": 203.81,
              "pitch": -5.82
            },
            {
              "to": "aud-005",
              "yaw": 214.47,
              "pitch": -2.67
            },
            {
              "to": "aud-004",
              "yaw": 208.73,
              "pitch": 0.26
            },
            {
              "to": "aud-040",
              "yaw": 224.39,
              "pitch": 10.95
            },
            {
              "to": "aud-039",
              "yaw": 233.94,
              "pitch": 11.46
            },
            {
              "to": "aud-038",
              "yaw": 249.34,
              "pitch": 12.44
            },
            {
              "to": "aud-037",
              "yaw": 268.77,
              "pitch": 13.29
            },
            {
              "to": "aud-036",
              "yaw": 284.88,
              "pitch": 13.06
            },
            {
              "to": "stg-015",
              "yaw": 22.52,
              "pitch": 1.32
            }
          ],
          "plan": {
            "x": 0.3466,
            "y": 0.225
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-009",
          "name": "舞台、樂池與貴賓室 09",
          "floor": "1F",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/stg-009-preview.webp",
            "mid": "pano/20260823-v1/stg-009-mid.webp",
            "full": "pano/20260823-v1/stg-009-full.webp"
          },
          "source": "CAM_20260820152007_0060_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-014",
              "yaw": 92.66,
              "pitch": -20.62
            },
            {
              "to": "stg-013",
              "yaw": 134,
              "pitch": -13.86
            },
            {
              "to": "stg-012",
              "yaw": 156.59,
              "pitch": -6.96
            },
            {
              "to": "stg-010",
              "yaw": 177.39,
              "pitch": -21.1
            },
            {
              "to": "stg-006",
              "yaw": 226.63,
              "pitch": -12.96
            },
            {
              "to": "stg-005",
              "yaw": 212.14,
              "pitch": -8.92
            },
            {
              "to": "stg-004",
              "yaw": 201.16,
              "pitch": -5.57
            },
            {
              "to": "stg-011",
              "yaw": 179.33,
              "pitch": -7.42
            },
            {
              "to": "stg-007",
              "yaw": 248.64,
              "pitch": -16.2
            },
            {
              "to": "stg-008",
              "yaw": 285.52,
              "pitch": -17.09
            },
            {
              "to": "aud-001",
              "yaw": 271.71,
              "pitch": -7.48
            },
            {
              "to": "aud-002",
              "yaw": 241.77,
              "pitch": -6.42
            },
            {
              "to": "aud-003",
              "yaw": 220.52,
              "pitch": -3.85
            },
            {
              "to": "aud-036",
              "yaw": 283.2,
              "pitch": 11.11
            },
            {
              "to": "aud-037",
              "yaw": 271.37,
              "pitch": 10.93
            },
            {
              "to": "aud-038",
              "yaw": 255.94,
              "pitch": 11.18
            },
            {
              "to": "aud-039",
              "yaw": 243.64,
              "pitch": 10.47
            },
            {
              "to": "aud-040",
              "yaw": 233.9,
              "pitch": 10.02
            },
            {
              "to": "stg-015",
              "yaw": 332.6,
              "pitch": 1.08
            }
          ],
          "plan": {
            "x": 0.3715,
            "y": 0.1762
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-010",
          "name": "舞台、樂池與貴賓室 10",
          "floor": "1F",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/stg-010-preview.webp",
            "mid": "pano/20260823-v1/stg-010-mid.webp",
            "full": "pano/20260823-v1/stg-010-full.webp"
          },
          "source": "CAM_20260820152034_0061_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-013",
              "yaw": 88.39,
              "pitch": -18.04
            },
            {
              "to": "stg-012",
              "yaw": 143.2,
              "pitch": -12.34
            },
            {
              "to": "stg-011",
              "yaw": 181.14,
              "pitch": -13.97
            },
            {
              "to": "stg-004",
              "yaw": 211.38,
              "pitch": -9.55
            },
            {
              "to": "stg-005",
              "yaw": 239.72,
              "pitch": -16.29
            },
            {
              "to": "stg-006",
              "yaw": 267.57,
              "pitch": -19.88
            },
            {
              "to": "stg-007",
              "yaw": 301.2,
              "pitch": -17.82
            },
            {
              "to": "stg-008",
              "yaw": 324.19,
              "pitch": -11.85
            },
            {
              "to": "stg-009",
              "yaw": 5.8,
              "pitch": -12.25
            },
            {
              "to": "stg-014",
              "yaw": 36.03,
              "pitch": -11.18
            },
            {
              "to": "aud-001",
              "yaw": 300.12,
              "pitch": -8.08
            },
            {
              "to": "aud-002",
              "yaw": 267.7,
              "pitch": -9.29
            },
            {
              "to": "aud-003",
              "yaw": 234.99,
              "pitch": -7.22
            },
            {
              "to": "aud-036",
              "yaw": 294.38,
              "pitch": 10.29
            },
            {
              "to": "aud-037",
              "yaw": 281.96,
              "pitch": 10.85
            },
            {
              "to": "aud-038",
              "yaw": 268.39,
              "pitch": 11.09
            },
            {
              "to": "aud-039",
              "yaw": 252.98,
              "pitch": 10.87
            },
            {
              "to": "aud-040",
              "yaw": 242.11,
              "pitch": 11.09
            },
            {
              "to": "stg-015",
              "yaw": 339.22,
              "pitch": 2.76
            }
          ],
          "plan": {
            "x": 0.4942,
            "y": 0.1723
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-011",
          "name": "舞台、樂池與貴賓室 11",
          "floor": "1F",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/stg-011-preview.webp",
            "mid": "pano/20260823-v1/stg-011-mid.webp",
            "full": "pano/20260823-v1/stg-011-full.webp"
          },
          "source": "CAM_20260820152059_0062_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-012",
              "yaw": 89.43,
              "pitch": -19.96
            },
            {
              "to": "stg-013",
              "yaw": 35.22,
              "pitch": -10.89
            },
            {
              "to": "stg-014",
              "yaw": 19.55,
              "pitch": -6.71
            },
            {
              "to": "stg-009",
              "yaw": 0.96,
              "pitch": -7.67
            },
            {
              "to": "stg-010",
              "yaw": 1.72,
              "pitch": -16.13
            },
            {
              "to": "stg-008",
              "yaw": 343.03,
              "pitch": -4.73
            },
            {
              "to": "stg-007",
              "yaw": 335.52,
              "pitch": -8.58
            },
            {
              "to": "stg-006",
              "yaw": 326.9,
              "pitch": -12
            },
            {
              "to": "stg-005",
              "yaw": 298.35,
              "pitch": -17.89
            },
            {
              "to": "stg-004",
              "yaw": 265.44,
              "pitch": -20.61
            },
            {
              "to": "aud-001",
              "yaw": 319.12,
              "pitch": -5.49
            },
            {
              "to": "aud-002",
              "yaw": 297.06,
              "pitch": -6.17
            },
            {
              "to": "aud-003",
              "yaw": 264.27,
              "pitch": -6.91
            },
            {
              "to": "aud-036",
              "yaw": 307.1,
              "pitch": 9.91
            },
            {
              "to": "aud-037",
              "yaw": 296.81,
              "pitch": 10.2
            },
            {
              "to": "aud-038",
              "yaw": 284.2,
              "pitch": 11.24
            },
            {
              "to": "aud-039",
              "yaw": 267.65,
              "pitch": 11.8
            },
            {
              "to": "aud-040",
              "yaw": 256.93,
              "pitch": 12.2
            }
          ],
          "plan": {
            "x": 0.6128,
            "y": 0.1723
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-012",
          "name": "舞台、樂池與貴賓室 12",
          "floor": "1F",
          "heading": 83,
          "images": {
            "preview": "pano/20260823-v1/stg-012-preview.webp",
            "mid": "pano/20260823-v1/stg-012-mid.webp",
            "full": "pano/20260823-v1/stg-012-full.webp"
          },
          "source": "CAM_20260820152118_0063_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-013",
              "yaw": 356.99,
              "pitch": -14.06
            },
            {
              "to": "stg-014",
              "yaw": 355.45,
              "pitch": -6.17
            },
            {
              "to": "stg-009",
              "yaw": 335.78,
              "pitch": -6.03
            },
            {
              "to": "stg-010",
              "yaw": 323.8,
              "pitch": -14.26
            },
            {
              "to": "stg-006",
              "yaw": 295.14,
              "pitch": -7.93
            },
            {
              "to": "stg-007",
              "yaw": 312.53,
              "pitch": -6.41
            },
            {
              "to": "stg-008",
              "yaw": 321.76,
              "pitch": -5.06
            },
            {
              "to": "stg-005",
              "yaw": 276.85,
              "pitch": -10.28
            },
            {
              "to": "stg-004",
              "yaw": 261.68,
              "pitch": -10.98
            },
            {
              "to": "stg-011",
              "yaw": 253.21,
              "pitch": -35.67
            },
            {
              "to": "aud-036",
              "yaw": 295.95,
              "pitch": 8.19
            },
            {
              "to": "aud-037",
              "yaw": 287.72,
              "pitch": 8.36
            },
            {
              "to": "aud-038",
              "yaw": 275.95,
              "pitch": 9.42
            },
            {
              "to": "aud-039",
              "yaw": 260.46,
              "pitch": 9.91
            },
            {
              "to": "aud-040",
              "yaw": 250.52,
              "pitch": 10.52
            },
            {
              "to": "aud-016",
              "yaw": 276.48,
              "pitch": 1.16
            },
            {
              "to": "aud-017",
              "yaw": 290.58,
              "pitch": 0.96
            },
            {
              "to": "aud-015",
              "yaw": 260.98,
              "pitch": 1.19
            }
          ],
          "plan": {
            "x": 0.6066,
            "y": 0.1234
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-013",
          "name": "舞台、樂池與貴賓室 13",
          "floor": "1F",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/stg-013-preview.webp",
            "mid": "pano/20260823-v1/stg-013-mid.webp",
            "full": "pano/20260823-v1/stg-013-full.webp"
          },
          "source": "CAM_20260820152146_0064_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-012",
              "yaw": 173.65,
              "pitch": -11.97
            },
            {
              "to": "stg-011",
              "yaw": 203.16,
              "pitch": -10.5
            },
            {
              "to": "stg-004",
              "yaw": 225.51,
              "pitch": -7.01
            },
            {
              "to": "stg-005",
              "yaw": 250.73,
              "pitch": -11.14
            },
            {
              "to": "stg-006",
              "yaw": 271.21,
              "pitch": -11.73
            },
            {
              "to": "stg-007",
              "yaw": 295.04,
              "pitch": -10.52
            },
            {
              "to": "stg-008",
              "yaw": 311.3,
              "pitch": -8.67
            },
            {
              "to": "stg-009",
              "yaw": 336.46,
              "pitch": -12.01
            },
            {
              "to": "stg-014",
              "yaw": 2.97,
              "pitch": -13.76
            },
            {
              "to": "stg-010",
              "yaw": 273.32,
              "pitch": -41.45
            },
            {
              "to": "aud-036",
              "yaw": 291.93,
              "pitch": 8.63
            },
            {
              "to": "aud-037",
              "yaw": 282.05,
              "pitch": 8.48
            },
            {
              "to": "aud-038",
              "yaw": 268.3,
              "pitch": 8.7
            },
            {
              "to": "aud-039",
              "yaw": 254.11,
              "pitch": 9.81
            },
            {
              "to": "aud-040",
              "yaw": 244.49,
              "pitch": 9.33
            },
            {
              "to": "stg-015",
              "yaw": 318.99,
              "pitch": 5.28
            }
          ],
          "plan": {
            "x": 0.4922,
            "y": 0.1234
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-014",
          "name": "舞台、樂池與貴賓室 14",
          "floor": "1F",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/stg-014-preview.webp",
            "mid": "pano/20260823-v1/stg-014-mid.webp",
            "full": "pano/20260823-v1/stg-014-full.webp"
          },
          "source": "CAM_20260820152212_0065_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-013",
              "yaw": 164.47,
              "pitch": -17.4
            },
            {
              "to": "stg-012",
              "yaw": 172.98,
              "pitch": -5.87
            },
            {
              "to": "stg-011",
              "yaw": 193.04,
              "pitch": -6.01
            },
            {
              "to": "stg-010",
              "yaw": 218.84,
              "pitch": -14.66
            },
            {
              "to": "stg-006",
              "yaw": 236.25,
              "pitch": -7.05
            },
            {
              "to": "stg-005",
              "yaw": 220.34,
              "pitch": -6.07
            },
            {
              "to": "stg-004",
              "yaw": 210.58,
              "pitch": -3.99
            },
            {
              "to": "stg-007",
              "yaw": 258.72,
              "pitch": -9.02
            },
            {
              "to": "stg-008",
              "yaw": 280.86,
              "pitch": -10.34
            },
            {
              "to": "stg-009",
              "yaw": 287.79,
              "pitch": -25.39
            },
            {
              "to": "aud-040",
              "yaw": 233.12,
              "pitch": 8.93
            },
            {
              "to": "aud-039",
              "yaw": 241.45,
              "pitch": 8.91
            },
            {
              "to": "aud-038",
              "yaw": 254.15,
              "pitch": 9.18
            },
            {
              "to": "aud-037",
              "yaw": 266.78,
              "pitch": 8.77
            },
            {
              "to": "aud-036",
              "yaw": 278.46,
              "pitch": 8.9
            },
            {
              "to": "stg-015",
              "yaw": 294.06,
              "pitch": 5.89
            }
          ],
          "plan": {
            "x": 0.3674,
            "y": 0.1277
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-015",
          "name": "舞台、樂池與貴賓室 15",
          "floor": "1F",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/stg-015-preview.webp",
            "mid": "pano/20260823-v1/stg-015-mid.webp",
            "full": "pano/20260823-v1/stg-015-full.webp"
          },
          "source": "CAM_20260820152527_0068_D.JPG",
          "description": "貴賓室外走廊，可通往音樂廳前廳與後台。",
          "hotspots": [],
          "links": [
            {
              "to": "stg-016",
              "yaw": 238.32,
              "pitch": -12.85
            },
            {
              "to": "stg-009",
              "yaw": 105.83,
              "pitch": 4.47
            },
            {
              "to": "stg-008",
              "yaw": 136.69,
              "pitch": 2
            }
          ],
          "plan": {
            "x": 0.1406,
            "y": 0.2603
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-016",
          "name": "舞台、樂池與貴賓室 16",
          "floor": "1F",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/stg-016-preview.webp",
            "mid": "pano/20260823-v1/stg-016-mid.webp",
            "full": "pano/20260823-v1/stg-016-full.webp"
          },
          "source": "CAM_20260820152554_0069_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-009",
              "yaw": 115.36,
              "pitch": 2.6
            },
            {
              "to": "stg-008",
              "yaw": 167.88,
              "pitch": 0.97
            },
            {
              "to": "stg-017",
              "yaw": 266.54,
              "pitch": -14.61
            },
            {
              "to": "stg-015",
              "yaw": 347.63,
              "pitch": -8.08
            }
          ],
          "plan": {
            "x": 0.2218,
            "y": 0.2582
          },
          "spaceType": "待分類"
        },
        {
          "id": "stg-017",
          "name": "舞台、樂池與貴賓室 17",
          "floor": "1F",
          "heading": 83,
          "images": {
            "preview": "pano/20260823-v1/stg-017-preview.webp",
            "mid": "pano/20260823-v1/stg-017-mid.webp",
            "full": "pano/20260823-v1/stg-017-full.webp"
          },
          "source": "CAM_20260820152617_0070_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "stg-016",
              "yaw": 84.65,
              "pitch": -5.75
            },
            {
              "to": "stg-015",
              "yaw": 33.13,
              "pitch": -1.52
            },
            {
              "to": "stg-008",
              "yaw": 151.24,
              "pitch": 2.03
            },
            {
              "to": "stg-001",
              "yaw": 192.99,
              "pitch": -15.8
            }
          ],
          "plan": {
            "x": 0.2155,
            "y": 0.3091
          },
          "spaceType": "待分類"
        }
      ],
      "boundaries": [
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-008",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-011",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-010",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-012",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-001",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-012",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-011",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-010",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-002",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-004",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-012",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-011",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-010",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-003",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-004",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-013",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-004",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-004",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-005",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-004",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-012",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-011",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-010",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-008",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-006",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-008",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-031",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-030",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-035",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-034",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-032",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-033",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-029",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-007",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-007",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-008",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-006",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-005",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-004",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-008",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-009",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-010",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-001",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-002",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-003",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-011",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-016",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-017",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-012",
          "to": "auditorium",
          "toNode": "aud-015",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-013",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-013",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-013",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-013",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-013",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-014",
          "to": "auditorium",
          "toNode": "aud-040",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-014",
          "to": "auditorium",
          "toNode": "aud-039",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-014",
          "to": "auditorium",
          "toNode": "aud-038",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-014",
          "to": "auditorium",
          "toNode": "aud-037",
          "label": "前往觀眾席"
        },
        {
          "node": "stg-014",
          "to": "auditorium",
          "toNode": "aud-036",
          "label": "前往觀眾席"
        }
      ],
      "updatedAt": "2026-08-23"
    },
    {
      "id": "greenroom",
      "name": "演出團隊休息區",
      "order": 4,
      "status": "ready",
      "photoCount": 37,
      "sourcePhotos": 37,
      "nodes": [
        {
          "id": "gre-001",
          "name": "演出團隊休息區 01",
          "floor": "B1",
          "heading": 93,
          "images": {
            "preview": "pano/20260823-v1/gre-001-preview.webp",
            "mid": "pano/20260823-v1/gre-001-mid.webp",
            "full": "pano/20260823-v1/gre-001-full.webp"
          },
          "source": "CAM_20260820152721_0071_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-002",
              "yaw": 166.82,
              "pitch": -27.79
            }
          ],
          "plan": {
            "x": 0.0345,
            "y": 0.1329
          }
        },
        {
          "id": "gre-002",
          "name": "演出團隊休息區 02",
          "floor": "B1",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/gre-002-preview.webp",
            "mid": "pano/20260823-v1/gre-002-mid.webp",
            "full": "pano/20260823-v1/gre-002-full.webp"
          },
          "source": "CAM_20260820152906_0074_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-015",
              "yaw": 182.11,
              "pitch": -14.91
            },
            {
              "to": "gre-016",
              "yaw": 187.03,
              "pitch": -5.56
            },
            {
              "to": "gre-014",
              "yaw": 222.51,
              "pitch": -8.33
            },
            {
              "to": "gre-003",
              "yaw": 268.75,
              "pitch": -13.03
            },
            {
              "to": "gre-004",
              "yaw": 268.7,
              "pitch": -3.53
            }
          ],
          "plan": {
            "x": 0.1781,
            "y": 0.1246
          }
        },
        {
          "id": "gre-003",
          "name": "演出團隊休息區 03",
          "floor": "B1",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/gre-003-preview.webp",
            "mid": "pano/20260823-v1/gre-003-mid.webp",
            "full": "pano/20260823-v1/gre-003-full.webp"
          },
          "source": "CAM_20260820152938_0075_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-005",
              "yaw": 51.74,
              "pitch": -8.84
            },
            {
              "to": "gre-002",
              "yaw": 81.3,
              "pitch": -8.13
            },
            {
              "to": "gre-014",
              "yaw": 109.19,
              "pitch": -9.77
            },
            {
              "to": "gre-004",
              "yaw": 270.55,
              "pitch": -12.48
            },
            {
              "to": "gre-010",
              "yaw": 304.72,
              "pitch": -9.65
            }
          ],
          "plan": {
            "x": 0.1822,
            "y": 0.5361
          }
        },
        {
          "id": "gre-004",
          "name": "演出團隊休息區 04",
          "floor": "B1",
          "heading": 94,
          "images": {
            "preview": "pano/20260823-v1/gre-004-preview.webp",
            "mid": "pano/20260823-v1/gre-004-mid.webp",
            "full": "pano/20260823-v1/gre-004-full.webp"
          },
          "source": "CAM_20260820153002_0076_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-003",
              "yaw": 93.13,
              "pitch": -18.16
            },
            {
              "to": "gre-002",
              "yaw": 89.82,
              "pitch": -6.24
            },
            {
              "to": "gre-014",
              "yaw": 105.49,
              "pitch": -4.81
            },
            {
              "to": "gre-005",
              "yaw": 77.47,
              "pitch": -4.28
            },
            {
              "to": "gre-010",
              "yaw": 352.28,
              "pitch": -16.93
            },
            {
              "to": "gre-008",
              "yaw": 19.84,
              "pitch": -14.53
            }
          ],
          "plan": {
            "x": 0.1843,
            "y": 0.8354
          }
        },
        {
          "id": "gre-005",
          "name": "演出團隊休息區 05",
          "floor": "B1",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/gre-005-preview.webp",
            "mid": "pano/20260823-v1/gre-005-mid.webp",
            "full": "pano/20260823-v1/gre-005-full.webp"
          },
          "source": "CAM_20260820153039_0077_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-003",
              "yaw": 193.5,
              "pitch": -0.77
            }
          ],
          "plan": {
            "x": 0.0761,
            "y": 0.2908
          }
        },
        {
          "id": "gre-006",
          "name": "演出團隊休息區 06",
          "floor": "B1",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/gre-006-preview.webp",
            "mid": "pano/20260823-v1/gre-006-mid.webp",
            "full": "pano/20260823-v1/gre-006-full.webp"
          },
          "source": "CAM_20260820153108_0078_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-007",
              "yaw": 189.99,
              "pitch": -1.53
            },
            {
              "to": "gre-003",
              "yaw": 164.9,
              "pitch": -0.41
            }
          ],
          "plan": {
            "x": 0.0512,
            "y": 0.4852
          }
        },
        {
          "id": "gre-007",
          "name": "演出團隊休息區 07",
          "floor": "B1",
          "heading": 359,
          "images": {
            "preview": "pano/20260823-v1/gre-007-preview.webp",
            "mid": "pano/20260823-v1/gre-007-mid.webp",
            "full": "pano/20260823-v1/gre-007-full.webp"
          },
          "source": "CAM_20260820153159_0080_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-006",
              "yaw": 329.05,
              "pitch": -13.54
            },
            {
              "to": "gre-003",
              "yaw": 50.71,
              "pitch": -7.71
            }
          ],
          "plan": {
            "x": 0.1177,
            "y": 0.5101
          }
        },
        {
          "id": "gre-008",
          "name": "演出團隊休息區 08",
          "floor": "B1",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/gre-008-preview.webp",
            "mid": "pano/20260823-v1/gre-008-mid.webp",
            "full": "pano/20260823-v1/gre-008-full.webp"
          },
          "source": "CAM_20260820153238_0081_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-009",
              "yaw": 162.66,
              "pitch": -4.19
            },
            {
              "to": "gre-003",
              "yaw": 195.05,
              "pitch": -3.36
            }
          ],
          "plan": {
            "x": 0.0512,
            "y": 0.6431
          }
        },
        {
          "id": "gre-009",
          "name": "演出團隊休息區 09",
          "floor": "B1",
          "heading": 4,
          "images": {
            "preview": "pano/20260823-v1/gre-009-preview.webp",
            "mid": "pano/20260823-v1/gre-009-mid.webp",
            "full": "pano/20260823-v1/gre-009-full.webp"
          },
          "source": "CAM_20260820153310_0082_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-008",
              "yaw": 335.92,
              "pitch": -11.76
            }
          ],
          "plan": {
            "x": 0.1094,
            "y": 0.6847
          }
        },
        {
          "id": "gre-010",
          "name": "演出團隊休息區 10",
          "floor": "B1",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/gre-010-preview.webp",
            "mid": "pano/20260823-v1/gre-010-mid.webp",
            "full": "pano/20260823-v1/gre-010-full.webp"
          },
          "source": "CAM_20260820153341_0083_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-004",
              "yaw": 165.5,
              "pitch": -1.61
            }
          ],
          "plan": {
            "x": 0.0741,
            "y": 0.8479
          }
        },
        {
          "id": "gre-011",
          "name": "演出團隊休息區 11",
          "floor": "B1",
          "heading": 263,
          "images": {
            "preview": "pano/20260823-v1/gre-011-preview.webp",
            "mid": "pano/20260823-v1/gre-011-mid.webp",
            "full": "pano/20260823-v1/gre-011-full.webp"
          },
          "source": "CAM_20260820153445_0084_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-014",
              "yaw": 257.5,
              "pitch": -2.9
            },
            {
              "to": "gre-012",
              "yaw": 257.91,
              "pitch": -19.59
            }
          ],
          "plan": {
            "x": 0.2779,
            "y": 0.9435
          }
        },
        {
          "id": "gre-012",
          "name": "演出團隊休息區 12",
          "floor": "B1",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/gre-012-preview.webp",
            "mid": "pano/20260823-v1/gre-012-mid.webp",
            "full": "pano/20260823-v1/gre-012-full.webp"
          },
          "source": "CAM_20260820153517_0085_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-014",
              "yaw": 89.11,
              "pitch": -12.69
            },
            {
              "to": "gre-013",
              "yaw": 119.89,
              "pitch": 3.43
            },
            {
              "to": "gre-011",
              "yaw": 280.78,
              "pitch": -13.41
            }
          ],
          "plan": {
            "x": 0.2488,
            "y": 0.7429
          }
        },
        {
          "id": "gre-013",
          "name": "演出團隊休息區 13",
          "floor": "B1",
          "heading": 107,
          "images": {
            "preview": "pano/20260823-v1/gre-013-preview.webp",
            "mid": "pano/20260823-v1/gre-013-mid.webp",
            "full": "pano/20260823-v1/gre-013-full.webp"
          },
          "source": "CAM_20260820153614_0086_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-014",
              "yaw": 102.36,
              "pitch": -12.04
            },
            {
              "to": "gre-012",
              "yaw": 348.64,
              "pitch": -49.09
            },
            {
              "to": "gre-011",
              "yaw": 309.01,
              "pitch": -18.02
            }
          ],
          "plan": {
            "x": 0.2675,
            "y": 0.5558
          }
        },
        {
          "id": "gre-014",
          "name": "演出團隊休息區 14",
          "floor": "B1",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/gre-014-preview.webp",
            "mid": "pano/20260823-v1/gre-014-mid.webp",
            "full": "pano/20260823-v1/gre-014-full.webp"
          },
          "source": "CAM_20260820153655_0087_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-002",
              "yaw": 18,
              "pitch": -14.04
            },
            {
              "to": "gre-013",
              "yaw": 270.39,
              "pitch": 4.13
            },
            {
              "to": "gre-012",
              "yaw": 295.17,
              "pitch": -18.02
            },
            {
              "to": "gre-011",
              "yaw": 282.13,
              "pitch": -0.17
            }
          ],
          "plan": {
            "x": 0.2634,
            "y": 0.3605
          }
        },
        {
          "id": "gre-015",
          "name": "演出團隊休息區 15",
          "floor": "B1",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/gre-015-preview.webp",
            "mid": "pano/20260823-v1/gre-015-mid.webp",
            "full": "pano/20260823-v1/gre-015-full.webp"
          },
          "source": "CAM_20260820153736_0088_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-002",
              "yaw": 1.11,
              "pitch": -13.49
            },
            {
              "to": "gre-016",
              "yaw": 203.29,
              "pitch": -14.03
            },
            {
              "to": "gre-018",
              "yaw": 196.8,
              "pitch": -6.29
            }
          ],
          "plan": {
            "x": 0.3258,
            "y": 0.1277
          }
        },
        {
          "id": "gre-016",
          "name": "演出團隊休息區 16",
          "floor": "B1",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/gre-016-preview.webp",
            "mid": "pano/20260823-v1/gre-016-mid.webp",
            "full": "pano/20260823-v1/gre-016-full.webp"
          },
          "source": "CAM_20260820153822_0089_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-015",
              "yaw": 22.22,
              "pitch": -15.11
            },
            {
              "to": "gre-002",
              "yaw": 9.95,
              "pitch": -6.73
            },
            {
              "to": "gre-017",
              "yaw": 237.76,
              "pitch": -8.25
            },
            {
              "to": "gre-018",
              "yaw": 192.04,
              "pitch": -15.08
            }
          ],
          "plan": {
            "x": 0.3965,
            "y": 0.241
          }
        },
        {
          "id": "gre-017",
          "name": "演出團隊休息區 17",
          "floor": "B1",
          "heading": 93,
          "images": {
            "preview": "pano/20260823-v1/gre-017-preview.webp",
            "mid": "pano/20260823-v1/gre-017-mid.webp",
            "full": "pano/20260823-v1/gre-017-full.webp"
          },
          "source": "CAM_20260820153913_0090_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-016",
              "yaw": 63.53,
              "pitch": -7.83
            },
            {
              "to": "gre-018",
              "yaw": 94.42,
              "pitch": -10.73
            },
            {
              "to": "gre-019",
              "yaw": 119.83,
              "pitch": -7.32
            }
          ],
          "plan": {
            "x": 0.513,
            "y": 0.6182
          }
        },
        {
          "id": "gre-018",
          "name": "演出團隊休息區 18",
          "floor": "B1",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/gre-018-preview.webp",
            "mid": "pano/20260823-v1/gre-018-mid.webp",
            "full": "pano/20260823-v1/gre-018-full.webp"
          },
          "source": "CAM_20260820154050_0092_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-016",
              "yaw": 8.39,
              "pitch": -15.26
            },
            {
              "to": "gre-015",
              "yaw": 17.86,
              "pitch": -7.6
            },
            {
              "to": "gre-002",
              "yaw": 11.5,
              "pitch": 1.09
            },
            {
              "to": "gre-017",
              "yaw": 271,
              "pitch": -14.36
            },
            {
              "to": "gre-019",
              "yaw": 159.54,
              "pitch": -16.71
            },
            {
              "to": "gre-020",
              "yaw": 157.58,
              "pitch": -5.68
            }
          ],
          "plan": {
            "x": 0.5067,
            "y": 0.3355
          }
        },
        {
          "id": "gre-019",
          "name": "演出團隊休息區 19",
          "floor": "B1",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/gre-019-preview.webp",
            "mid": "pano/20260823-v1/gre-019-mid.webp",
            "full": "pano/20260823-v1/gre-019-full.webp"
          },
          "source": "CAM_20260820154118_0093_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-020",
              "yaw": 155.1,
              "pitch": -15.24
            },
            {
              "to": "gre-021",
              "yaw": 165.7,
              "pitch": -4.89
            },
            {
              "to": "gre-018",
              "yaw": 344.51,
              "pitch": -12.89
            },
            {
              "to": "gre-017",
              "yaw": 302.78,
              "pitch": -8.46
            }
          ],
          "plan": {
            "x": 0.6357,
            "y": 0.2482
          }
        },
        {
          "id": "gre-020",
          "name": "演出團隊休息區 20",
          "floor": "B1",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/gre-020-preview.webp",
            "mid": "pano/20260823-v1/gre-020-mid.webp",
            "full": "pano/20260823-v1/gre-020-full.webp"
          },
          "source": "CAM_20260820154146_0094_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-019",
              "yaw": 349.52,
              "pitch": -13.86
            },
            {
              "to": "gre-018",
              "yaw": 342.01,
              "pitch": -6.47
            },
            {
              "to": "gre-021",
              "yaw": 177.1,
              "pitch": -17.72
            },
            {
              "to": "gre-024",
              "yaw": 205.82,
              "pitch": -6.39
            }
          ],
          "plan": {
            "x": 0.7085,
            "y": 0.136
          }
        },
        {
          "id": "gre-021",
          "name": "演出團隊休息區 21",
          "floor": "B1",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/gre-021-preview.webp",
            "mid": "pano/20260823-v1/gre-021-mid.webp",
            "full": "pano/20260823-v1/gre-021-full.webp"
          },
          "source": "CAM_20260820154205_0095_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-035",
              "yaw": 157.9,
              "pitch": -15.26
            },
            {
              "to": "gre-022",
              "yaw": 265.9,
              "pitch": -14.88
            },
            {
              "to": "gre-023",
              "yaw": 265.36,
              "pitch": -4.59
            },
            {
              "to": "gre-032",
              "yaw": 312.21,
              "pitch": -10.6
            },
            {
              "to": "gre-024",
              "yaw": 227.53,
              "pitch": -14.34
            },
            {
              "to": "gre-026",
              "yaw": 250.78,
              "pitch": -7.78
            }
          ],
          "plan": {
            "x": 0.825,
            "y": 0.1152
          }
        },
        {
          "id": "gre-022",
          "name": "演出團隊休息區 22",
          "floor": "B1",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/gre-022-preview.webp",
            "mid": "pano/20260823-v1/gre-022-mid.webp",
            "full": "pano/20260823-v1/gre-022-full.webp"
          },
          "source": "CAM_20260820154242_0096_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-021",
              "yaw": 94.49,
              "pitch": -9.88
            },
            {
              "to": "gre-024",
              "yaw": 110.09,
              "pitch": -11.79
            },
            {
              "to": "gre-032",
              "yaw": 73.43,
              "pitch": -11.47
            },
            {
              "to": "gre-026",
              "yaw": 170.73,
              "pitch": -24.53
            },
            {
              "to": "gre-027",
              "yaw": 166.23,
              "pitch": -0.7
            },
            {
              "to": "gre-028",
              "yaw": 210.92,
              "pitch": -19.74
            },
            {
              "to": "gre-030",
              "yaw": 252.19,
              "pitch": -8.73
            }
          ],
          "plan": {
            "x": 0.8271,
            "y": 0.5018
          }
        },
        {
          "id": "gre-023",
          "name": "演出團隊休息區 23",
          "floor": "B1",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/gre-023-preview.webp",
            "mid": "pano/20260823-v1/gre-023-mid.webp",
            "full": "pano/20260823-v1/gre-023-full.webp"
          },
          "source": "CAM_20260820154303_0097_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-030",
              "yaw": 213.86,
              "pitch": -26.25
            },
            {
              "to": "gre-028",
              "yaw": 116.22,
              "pitch": -17.78
            },
            {
              "to": "gre-026",
              "yaw": 106.25,
              "pitch": -12.23
            },
            {
              "to": "gre-024",
              "yaw": 96.68,
              "pitch": -5.98
            },
            {
              "to": "gre-021",
              "yaw": 89.44,
              "pitch": -6.29
            },
            {
              "to": "gre-032",
              "yaw": 76.3,
              "pitch": -5.92
            }
          ],
          "plan": {
            "x": 0.8291,
            "y": 0.8011
          }
        },
        {
          "id": "gre-024",
          "name": "演出團隊休息區 24",
          "floor": "B1",
          "heading": 88,
          "images": {
            "preview": "pano/20260823-v1/gre-024-preview.webp",
            "mid": "pano/20260823-v1/gre-024-mid.webp",
            "full": "pano/20260823-v1/gre-024-full.webp"
          },
          "source": "CAM_20260820154334_0098_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-025",
              "yaw": 233.72,
              "pitch": -29.98
            },
            {
              "to": "gre-021",
              "yaw": 25.77,
              "pitch": -14.02
            },
            {
              "to": "gre-032",
              "yaw": 9.33,
              "pitch": -2.49
            }
          ],
          "plan": {
            "x": 0.8811,
            "y": 0.2825
          }
        },
        {
          "id": "gre-025",
          "name": "演出團隊休息區 25",
          "floor": "B1",
          "heading": 92,
          "images": {
            "preview": "pano/20260823-v1/gre-025-preview.webp",
            "mid": "pano/20260823-v1/gre-025-mid.webp",
            "full": "pano/20260823-v1/gre-025-full.webp"
          },
          "source": "CAM_20260820154429_0100_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-024",
              "yaw": 63.54,
              "pitch": -18.89
            }
          ],
          "plan": {
            "x": 0.9456,
            "y": 0.3532
          }
        },
        {
          "id": "gre-026",
          "name": "演出團隊休息區 26",
          "floor": "B1",
          "heading": 87,
          "images": {
            "preview": "pano/20260823-v1/gre-026-preview.webp",
            "mid": "pano/20260823-v1/gre-026-mid.webp",
            "full": "pano/20260823-v1/gre-026-full.webp"
          },
          "source": "CAM_20260820154515_0101_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-027",
              "yaw": 164.94,
              "pitch": -7.82
            },
            {
              "to": "gre-022",
              "yaw": 346.68,
              "pitch": -16.54
            }
          ],
          "plan": {
            "x": 0.8874,
            "y": 0.4779
          }
        },
        {
          "id": "gre-027",
          "name": "演出團隊休息區 27",
          "floor": "B1",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/gre-027-preview.webp",
            "mid": "pano/20260823-v1/gre-027-mid.webp",
            "full": "pano/20260823-v1/gre-027-full.webp"
          },
          "source": "CAM_20260820154537_0102_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-026",
              "yaw": 287.63,
              "pitch": -17.63
            }
          ],
          "plan": {
            "x": 0.9456,
            "y": 0.5153
          }
        },
        {
          "id": "gre-028",
          "name": "演出團隊休息區 28",
          "floor": "B1",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/gre-028-preview.webp",
            "mid": "pano/20260823-v1/gre-028-mid.webp",
            "full": "pano/20260823-v1/gre-028-full.webp"
          },
          "source": "CAM_20260820154620_0103_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-022",
              "yaw": 17.37,
              "pitch": -15.6
            },
            {
              "to": "gre-029",
              "yaw": 193.08,
              "pitch": -11.04
            }
          ],
          "plan": {
            "x": 0.8874,
            "y": 0.639
          }
        },
        {
          "id": "gre-029",
          "name": "演出團隊休息區 29",
          "floor": "B1",
          "heading": 94,
          "images": {
            "preview": "pano/20260823-v1/gre-029-preview.webp",
            "mid": "pano/20260823-v1/gre-029-mid.webp",
            "full": "pano/20260823-v1/gre-029-full.webp"
          },
          "source": "CAM_20260820154649_0104_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-028",
              "yaw": 94.48,
              "pitch": -14.69
            }
          ],
          "plan": {
            "x": 0.9456,
            "y": 0.6847
          }
        },
        {
          "id": "gre-030",
          "name": "演出團隊休息區 30",
          "floor": "B1",
          "heading": 90,
          "images": {
            "preview": "pano/20260823-v1/gre-030-preview.webp",
            "mid": "pano/20260823-v1/gre-030-mid.webp",
            "full": "pano/20260823-v1/gre-030-full.webp"
          },
          "source": "CAM_20260820154734_0105_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-031",
              "yaw": 123.76,
              "pitch": -24.74
            },
            {
              "to": "gre-023",
              "yaw": 344.52,
              "pitch": -16.26
            }
          ],
          "plan": {
            "x": 0.8895,
            "y": 0.8094
          }
        },
        {
          "id": "gre-031",
          "name": "演出團隊休息區 31",
          "floor": "B1",
          "heading": 91,
          "images": {
            "preview": "pano/20260823-v1/gre-031-preview.webp",
            "mid": "pano/20260823-v1/gre-031-mid.webp",
            "full": "pano/20260823-v1/gre-031-full.webp"
          },
          "source": "CAM_20260820154829_0107_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-030",
              "yaw": 296.93,
              "pitch": -18.41
            }
          ],
          "plan": {
            "x": 0.9477,
            "y": 0.8718
          }
        },
        {
          "id": "gre-032",
          "name": "演出團隊休息區 32",
          "floor": "B1",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/gre-032-preview.webp",
            "mid": "pano/20260823-v1/gre-032-mid.webp",
            "full": "pano/20260823-v1/gre-032-full.webp"
          },
          "source": "CAM_20260820154953_0108_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-021",
              "yaw": 159.47,
              "pitch": -9.65
            },
            {
              "to": "gre-033",
              "yaw": 268.59,
              "pitch": 4.25
            },
            {
              "to": "gre-034",
              "yaw": 255.21,
              "pitch": -3.23
            }
          ],
          "plan": {
            "x": 0.7376,
            "y": 0.3438
          }
        },
        {
          "id": "gre-033",
          "name": "演出團隊休息區 33",
          "floor": "B1",
          "heading": 89,
          "images": {
            "preview": "pano/20260823-v1/gre-033-preview.webp",
            "mid": "pano/20260823-v1/gre-033-mid.webp",
            "full": "pano/20260823-v1/gre-033-full.webp"
          },
          "source": "CAM_20260820155041_0109_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-032",
              "yaw": 84.82,
              "pitch": -9.92
            },
            {
              "to": "gre-021",
              "yaw": 114.7,
              "pitch": -9.06
            },
            {
              "to": "gre-034",
              "yaw": 241.3,
              "pitch": -14.59
            }
          ],
          "plan": {
            "x": 0.7522,
            "y": 0.5517
          }
        },
        {
          "id": "gre-034",
          "name": "演出團隊休息區 34",
          "floor": "B1",
          "heading": 86,
          "images": {
            "preview": "pano/20260823-v1/gre-034-preview.webp",
            "mid": "pano/20260823-v1/gre-034-mid.webp",
            "full": "pano/20260823-v1/gre-034-full.webp"
          },
          "source": "CAM_20260820155124_0110_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-033",
              "yaw": 84.35,
              "pitch": 1.63
            }
          ],
          "plan": {
            "x": 0.7563,
            "y": 0.9383
          }
        },
        {
          "id": "gre-035",
          "name": "演出團隊休息區 35",
          "floor": "B1",
          "heading": 84,
          "images": {
            "preview": "pano/20260823-v1/gre-035-preview.webp",
            "mid": "pano/20260823-v1/gre-035-mid.webp",
            "full": "pano/20260823-v1/gre-035-full.webp"
          },
          "source": "CAM_20260820155236_0111_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-021",
              "yaw": 340.42,
              "pitch": -20.28
            },
            {
              "to": "gre-020",
              "yaw": 344.38,
              "pitch": -7.55
            },
            {
              "to": "gre-036",
              "yaw": 188.75,
              "pitch": 13.45
            }
          ],
          "plan": {
            "x": 0.8957,
            "y": 0.0986
          }
        },
        {
          "id": "gre-036",
          "name": "演出團隊休息區 36",
          "floor": "B1",
          "heading": 94,
          "images": {
            "preview": "pano/20260823-v1/gre-036-preview.webp",
            "mid": "pano/20260823-v1/gre-036-mid.webp",
            "full": "pano/20260823-v1/gre-036-full.webp"
          },
          "source": "CAM_20260820155307_0112_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-035",
              "yaw": 16.81,
              "pitch": -29.31
            }
          ],
          "plan": {
            "x": 0.9685,
            "y": 0.1443
          }
        },
        {
          "id": "gre-037",
          "name": "演出團隊休息區 37",
          "floor": "B1",
          "heading": 85,
          "images": {
            "preview": "pano/20260823-v1/gre-037-preview.webp",
            "mid": "pano/20260823-v1/gre-037-mid.webp",
            "full": "pano/20260823-v1/gre-037-full.webp"
          },
          "source": "CAM_20260820155437_0113_D.JPG",
          "description": "",
          "hotspots": [],
          "links": [
            {
              "to": "gre-001",
              "yaw": 342.79,
              "pitch": 11.58
            },
            {
              "to": "gre-002",
              "yaw": 187.32,
              "pitch": -26.95
            },
            {
              "to": "gre-015",
              "yaw": 186.14,
              "pitch": -6.81
            }
          ],
          "plan": {
            "x": 0.1011,
            "y": 0.1038
          }
        }
      ],
      "boundaries": [],
      "updatedAt": "2026-08-23"
    }
  ]
};
