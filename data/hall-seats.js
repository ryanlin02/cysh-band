// 由 build-seats.py 從館方 Excel 自動產生，請勿手動編輯。
// 重新產生：python3 build-seats.py

export const HALL_SEATS = {
  "venue": "嘉義市政府文化局音樂廳",
  "source": "觀眾席座位圖 左單右雙(更新1120306).xlsx",
  "note": "編號規則為左單右雙；c 為 Excel 欄索引，直接對應實際左右位置",
  "totals": {
    "total": 961,
    "sellable": 951,
    "staffHold": 10
  },
  "types": {
    "normal": "一般席",
    "wheelchair": "輪椅席",
    "companion": "輪椅陪同席",
    "removable": "可移動收納席",
    "staff": "館方工作保留席"
  },
  "floors": [
    {
      "id": "1F",
      "label": "一樓",
      "total": 705,
      "sellable": 699,
      "colMin": 4,
      "colMax": 55,
      "rows": [
        {
          "row": 1,
          "seats": [
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 21,
              "t": "wheelchair"
            },
            {
              "c": 17,
              "n": 17,
              "t": "wheelchair"
            },
            {
              "c": 19,
              "n": 13,
              "t": "wheelchair"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "wheelchair"
            },
            {
              "c": 42,
              "n": 18,
              "t": "wheelchair"
            },
            {
              "c": 44,
              "n": 22,
              "t": "wheelchair"
            },
            {
              "c": 46,
              "n": 26,
              "t": "wheelchair"
            },
            {
              "c": 48,
              "n": 30,
              "t": "wheelchair"
            },
            {
              "c": 50,
              "n": 34,
              "t": "wheelchair"
            }
          ]
        },
        {
          "row": 2,
          "seats": [
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "companion"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "companion"
            },
            {
              "c": 20,
              "n": 13,
              "t": "companion"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "companion"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "companion"
            },
            {
              "c": 44,
              "n": 22,
              "t": "companion"
            },
            {
              "c": 45,
              "n": 24,
              "t": "companion"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 32,
              "t": "companion"
            },
            {
              "c": 50,
              "n": 34,
              "t": "companion"
            }
          ]
        },
        {
          "row": 3,
          "seats": [
            {
              "c": 9,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 50,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 51,
              "n": 34,
              "t": "normal"
            }
          ]
        },
        {
          "row": 4,
          "seats": [
            {
              "c": 9,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 50,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 51,
              "n": 36,
              "t": "normal"
            }
          ]
        },
        {
          "row": 5,
          "seats": [
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            }
          ]
        },
        {
          "row": 6,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "staff"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "staff"
            }
          ]
        },
        {
          "row": 7,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 34,
              "t": "normal"
            }
          ]
        },
        {
          "row": 8,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            }
          ]
        },
        {
          "row": 9,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 34,
              "t": "normal"
            }
          ]
        },
        {
          "row": 10,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            }
          ]
        },
        {
          "row": 11,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 34,
              "t": "normal"
            }
          ]
        },
        {
          "row": 12,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            }
          ]
        },
        {
          "row": 13,
          "seats": [
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 34,
              "t": "normal"
            }
          ]
        },
        {
          "row": 14,
          "seats": [
            {
              "c": 4,
              "n": 37,
              "t": "staff"
            },
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 38,
              "t": "staff"
            }
          ]
        },
        {
          "row": 15,
          "seats": [
            {
              "c": 4,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 38,
              "t": "normal"
            }
          ]
        },
        {
          "row": 16,
          "seats": [
            {
              "c": 4,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 38,
              "t": "normal"
            }
          ]
        },
        {
          "row": 17,
          "seats": [
            {
              "c": 4,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 38,
              "t": "normal"
            }
          ]
        },
        {
          "row": 18,
          "seats": [
            {
              "c": 4,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 38,
              "t": "normal"
            }
          ]
        },
        {
          "row": 19,
          "seats": [
            {
              "c": 4,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "removable"
            },
            {
              "c": 25,
              "n": 9,
              "t": "removable"
            },
            {
              "c": 26,
              "n": 7,
              "t": "removable"
            },
            {
              "c": 27,
              "n": 5,
              "t": "removable"
            },
            {
              "c": 28,
              "n": 3,
              "t": "removable"
            },
            {
              "c": 29,
              "n": 1,
              "t": "removable"
            },
            {
              "c": 30,
              "n": 2,
              "t": "removable"
            },
            {
              "c": 31,
              "n": 4,
              "t": "removable"
            },
            {
              "c": 32,
              "n": 6,
              "t": "removable"
            },
            {
              "c": 33,
              "n": 8,
              "t": "removable"
            },
            {
              "c": 34,
              "n": 10,
              "t": "removable"
            },
            {
              "c": 40,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 36,
              "t": "normal"
            }
          ]
        },
        {
          "row": 20,
          "seats": [
            {
              "c": 4,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 13,
              "t": "staff"
            },
            {
              "c": 24,
              "n": 11,
              "t": "removable"
            },
            {
              "c": 25,
              "n": 9,
              "t": "removable"
            },
            {
              "c": 26,
              "n": 7,
              "t": "removable"
            },
            {
              "c": 27,
              "n": 5,
              "t": "removable"
            },
            {
              "c": 28,
              "n": 3,
              "t": "removable"
            },
            {
              "c": 29,
              "n": 1,
              "t": "removable"
            },
            {
              "c": 30,
              "n": 2,
              "t": "removable"
            },
            {
              "c": 31,
              "n": 4,
              "t": "removable"
            },
            {
              "c": 32,
              "n": 6,
              "t": "removable"
            },
            {
              "c": 33,
              "n": 8,
              "t": "removable"
            },
            {
              "c": 34,
              "n": 10,
              "t": "removable"
            },
            {
              "c": 41,
              "n": 12,
              "t": "staff"
            },
            {
              "c": 42,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 34,
              "t": "normal"
            }
          ]
        }
      ]
    },
    {
      "id": "2F",
      "label": "二樓",
      "total": 256,
      "sellable": 252,
      "colMin": 4,
      "colMax": 55,
      "rows": [
        {
          "row": 1,
          "seats": [
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "staff"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 39,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 36,
              "t": "staff"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            }
          ]
        },
        {
          "row": 2,
          "seats": [
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 39,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            }
          ]
        },
        {
          "row": 3,
          "seats": [
            {
              "c": 4,
              "n": 41,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 39,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 42,
              "t": "normal"
            }
          ]
        },
        {
          "row": 4,
          "seats": [
            {
              "c": 4,
              "n": 41,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 39,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 42,
              "t": "normal"
            }
          ]
        },
        {
          "row": 5,
          "seats": [
            {
              "c": 4,
              "n": 41,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 39,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 42,
              "t": "normal"
            }
          ]
        },
        {
          "row": 6,
          "seats": [
            {
              "c": 4,
              "n": 41,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "normal"
            },
            {
              "c": 10,
              "n": 33,
              "t": "normal"
            },
            {
              "c": 11,
              "n": 31,
              "t": "normal"
            },
            {
              "c": 12,
              "n": 29,
              "t": "normal"
            },
            {
              "c": 13,
              "n": 27,
              "t": "normal"
            },
            {
              "c": 14,
              "n": 25,
              "t": "normal"
            },
            {
              "c": 15,
              "n": 23,
              "t": "normal"
            },
            {
              "c": 16,
              "n": 21,
              "t": "normal"
            },
            {
              "c": 17,
              "n": 19,
              "t": "normal"
            },
            {
              "c": 18,
              "n": 17,
              "t": "normal"
            },
            {
              "c": 19,
              "n": 15,
              "t": "normal"
            },
            {
              "c": 20,
              "n": 13,
              "t": "normal"
            },
            {
              "c": 24,
              "n": 11,
              "t": "normal"
            },
            {
              "c": 25,
              "n": 9,
              "t": "normal"
            },
            {
              "c": 26,
              "n": 7,
              "t": "normal"
            },
            {
              "c": 27,
              "n": 5,
              "t": "normal"
            },
            {
              "c": 28,
              "n": 3,
              "t": "normal"
            },
            {
              "c": 29,
              "n": 1,
              "t": "normal"
            },
            {
              "c": 30,
              "n": 2,
              "t": "normal"
            },
            {
              "c": 31,
              "n": 4,
              "t": "normal"
            },
            {
              "c": 32,
              "n": 6,
              "t": "normal"
            },
            {
              "c": 33,
              "n": 8,
              "t": "normal"
            },
            {
              "c": 34,
              "n": 10,
              "t": "normal"
            },
            {
              "c": 35,
              "n": 12,
              "t": "normal"
            },
            {
              "c": 39,
              "n": 14,
              "t": "normal"
            },
            {
              "c": 40,
              "n": 16,
              "t": "normal"
            },
            {
              "c": 41,
              "n": 18,
              "t": "normal"
            },
            {
              "c": 42,
              "n": 20,
              "t": "normal"
            },
            {
              "c": 43,
              "n": 22,
              "t": "normal"
            },
            {
              "c": 44,
              "n": 24,
              "t": "normal"
            },
            {
              "c": 45,
              "n": 26,
              "t": "normal"
            },
            {
              "c": 46,
              "n": 28,
              "t": "normal"
            },
            {
              "c": 47,
              "n": 30,
              "t": "normal"
            },
            {
              "c": 48,
              "n": 32,
              "t": "normal"
            },
            {
              "c": 49,
              "n": 34,
              "t": "normal"
            },
            {
              "c": 52,
              "n": 36,
              "t": "normal"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 42,
              "t": "normal"
            }
          ]
        },
        {
          "row": 7,
          "seats": [
            {
              "c": 4,
              "n": 41,
              "t": "normal"
            },
            {
              "c": 5,
              "n": 39,
              "t": "normal"
            },
            {
              "c": 6,
              "n": 37,
              "t": "normal"
            },
            {
              "c": 7,
              "n": 35,
              "t": "staff"
            },
            {
              "c": 52,
              "n": 36,
              "t": "staff"
            },
            {
              "c": 53,
              "n": 38,
              "t": "normal"
            },
            {
              "c": 54,
              "n": 40,
              "t": "normal"
            },
            {
              "c": 55,
              "n": 42,
              "t": "normal"
            }
          ]
        }
      ]
    }
  ]
};
