/* נוצר אוטומטית על ידי tools/build-lessons.js — אין לערוך ידנית.
   כדי לשנות תוכן: ערכו את data/lesson-N.json והריצו `node tools/build-lessons.js`. */
window.__LESSON_BUNDLE__ = {
  "lessons": [
    {
      "lessonId": 1,
      "title": "Family & Me",
      "titleHe": "משפחה ואני",
      "introHe": "היום נלמד לדבר על המשפחה שלנו באנגלית!",
      "reviewWords": [],
      "newWords": [
        {
          "id": "mother",
          "en": "mother",
          "he": "אמא",
          "imagePrompt": "cartoon icon of a smiling mother",
          "audioText": "mother"
        },
        {
          "id": "father",
          "en": "father",
          "he": "אבא",
          "imagePrompt": "cartoon icon of a smiling father",
          "audioText": "father"
        },
        {
          "id": "sister",
          "en": "sister",
          "he": "אחות",
          "imagePrompt": "cartoon icon of a young girl with pigtails",
          "audioText": "sister"
        },
        {
          "id": "brother",
          "en": "brother",
          "he": "אח",
          "imagePrompt": "cartoon icon of a young boy",
          "audioText": "brother"
        },
        {
          "id": "baby",
          "en": "baby",
          "he": "תינוק",
          "imagePrompt": "cartoon icon of a happy baby with a pacifier",
          "audioText": "baby"
        },
        {
          "id": "family",
          "en": "family",
          "he": "משפחה",
          "imagePrompt": "cartoon icon of a family of four standing together",
          "audioText": "family"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "This is my mother.",
          "he": "זאת אמא שלי.",
          "matchImagePrompt": "cartoon icon of a smiling mother",
          "matchWordId": "mother",
          "distractorWordIds": [
            "father",
            "brother"
          ]
        },
        {
          "id": "s2",
          "en": "I have a brother.",
          "he": "יש לי אח.",
          "matchImagePrompt": "cartoon icon of a young boy",
          "matchWordId": "brother",
          "distractorWordIds": [
            "sister",
            "baby"
          ]
        },
        {
          "id": "s3",
          "en": "She is my sister.",
          "he": "היא האחות שלי.",
          "matchImagePrompt": "cartoon icon of a young girl with pigtails",
          "matchWordId": "sister",
          "distractorWordIds": [
            "mother",
            "brother"
          ]
        },
        {
          "id": "s4",
          "en": "My family is big.",
          "he": "המשפחה שלי גדולה.",
          "matchImagePrompt": "cartoon icon of a family of four standing together",
          "matchWordId": "family",
          "distractorWordIds": [
            "baby",
            "father"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: זאת אמא שלי",
          "expectedPhrase": "this is my mother",
          "acceptableVariants": [
            "this is my mom",
            "that is my mother",
            "this is mother"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: יש לי אחות",
          "expectedPhrase": "i have a sister",
          "acceptableVariants": [
            "i have sister",
            "i have a brother",
            "i have got a sister"
          ]
        }
      ],
      "game": {
        "type": "matching",
        "wordIds": [
          "mother",
          "father",
          "brother",
          "sister",
          "baby",
          "family"
        ]
      }
    },
    {
      "lessonId": 2,
      "title": "My House",
      "titleHe": "הבית שלי",
      "introHe": "היום נלמד את המילים של הבית והחדרים שלנו.",
      "reviewWords": [
        "family",
        "mother"
      ],
      "newWords": [
        {
          "id": "house",
          "en": "house",
          "he": "בית",
          "imagePrompt": "cartoon icon of a small house with a red roof",
          "audioText": "house"
        },
        {
          "id": "room",
          "en": "room",
          "he": "חדר",
          "imagePrompt": "cartoon icon of a cozy room with a rug and a lamp",
          "audioText": "room"
        },
        {
          "id": "bed",
          "en": "bed",
          "he": "מיטה",
          "imagePrompt": "cartoon icon of a bed with a pillow and blanket",
          "audioText": "bed"
        },
        {
          "id": "door",
          "en": "door",
          "he": "דלת",
          "imagePrompt": "cartoon icon of a wooden door with a round handle",
          "audioText": "door"
        },
        {
          "id": "window",
          "en": "window",
          "he": "חלון",
          "imagePrompt": "cartoon icon of a window with curtains and blue sky",
          "audioText": "window"
        },
        {
          "id": "kitchen",
          "en": "kitchen",
          "he": "מטבח",
          "imagePrompt": "cartoon icon of a kitchen with a pot on the stove",
          "audioText": "kitchen"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I have a big house.",
          "he": "יש לי בית גדול.",
          "matchImagePrompt": "cartoon icon of a small house with a red roof",
          "matchWordId": "house",
          "distractorWordIds": [
            "room",
            "kitchen"
          ]
        },
        {
          "id": "s2",
          "en": "My bed is in my room.",
          "he": "המיטה שלי בחדר שלי.",
          "matchImagePrompt": "cartoon icon of a bed with a pillow and blanket",
          "matchWordId": "bed",
          "distractorWordIds": [
            "door",
            "window"
          ]
        },
        {
          "id": "s3",
          "en": "Open the door, please.",
          "he": "תפתח/י את הדלת, בבקשה.",
          "matchImagePrompt": "cartoon icon of a wooden door with a round handle",
          "matchWordId": "door",
          "distractorWordIds": [
            "window",
            "bed"
          ]
        },
        {
          "id": "s4",
          "en": "My family is in the kitchen.",
          "he": "המשפחה שלי במטבח.",
          "matchImagePrompt": "cartoon icon of a kitchen with a pot on the stove",
          "matchWordId": "kitchen",
          "distractorWordIds": [
            "room",
            "house"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: יש לי בית גדול",
          "expectedPhrase": "i have a big house",
          "acceptableVariants": [
            "i have big house",
            "i have got a big house"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: המיטה שלי בחדר שלי",
          "expectedPhrase": "my bed is in my room",
          "acceptableVariants": [
            "my bed is in the room",
            "my bed is in my bedroom"
          ]
        }
      ],
      "game": {
        "type": "matching",
        "wordIds": [
          "house",
          "room",
          "bed",
          "door",
          "window",
          "kitchen"
        ]
      }
    },
    {
      "lessonId": 3,
      "title": "Food & Drinks",
      "titleHe": "אוכל ושתייה",
      "introHe": "היום נלמד להגיד מה אנחנו אוהבים לאכול ולשתות.",
      "reviewWords": [
        "house",
        "family"
      ],
      "newWords": [
        {
          "id": "apple",
          "en": "apple",
          "he": "תפוח",
          "imagePrompt": "cartoon icon of a red apple with a green leaf",
          "audioText": "apple"
        },
        {
          "id": "bread",
          "en": "bread",
          "he": "לחם",
          "imagePrompt": "cartoon icon of a loaf of bread",
          "audioText": "bread"
        },
        {
          "id": "water",
          "en": "water",
          "he": "מים",
          "imagePrompt": "cartoon icon of a glass of water",
          "audioText": "water"
        },
        {
          "id": "milk",
          "en": "milk",
          "he": "חלב",
          "imagePrompt": "cartoon icon of a milk carton",
          "audioText": "milk"
        },
        {
          "id": "pizza",
          "en": "pizza",
          "he": "פיצה",
          "imagePrompt": "cartoon icon of a pizza slice with pepperoni",
          "audioText": "pizza"
        },
        {
          "id": "like",
          "en": "like",
          "he": "אוהב/ת",
          "imagePrompt": "cartoon icon of a red heart with a smile",
          "audioText": "like"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I like pizza.",
          "he": "אני אוהב/ת פיצה.",
          "matchImagePrompt": "cartoon icon of a pizza slice",
          "matchWordId": "pizza",
          "distractorWordIds": [
            "apple",
            "bread"
          ]
        },
        {
          "id": "s2",
          "en": "I don't like milk.",
          "he": "אני לא אוהב/ת חלב.",
          "matchImagePrompt": "cartoon icon of a milk carton",
          "matchWordId": "milk",
          "distractorWordIds": [
            "water",
            "apple"
          ]
        },
        {
          "id": "s3",
          "en": "Can I have water, please?",
          "he": "אפשר לקבל מים, בבקשה?",
          "matchImagePrompt": "cartoon icon of a glass of water",
          "matchWordId": "water",
          "distractorWordIds": [
            "milk",
            "bread"
          ]
        },
        {
          "id": "s4",
          "en": "She likes apples.",
          "he": "היא אוהבת תפוחים.",
          "matchImagePrompt": "cartoon icon of a red apple",
          "matchWordId": "apple",
          "distractorWordIds": [
            "pizza",
            "milk"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: אני אוהב/ת פיצה",
          "expectedPhrase": "i like pizza",
          "acceptableVariants": [
            "i like pizzas",
            "i really like pizza"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: אפשר לקבל מים, בבקשה?",
          "expectedPhrase": "can i have water please",
          "acceptableVariants": [
            "can i have some water please",
            "can i have water"
          ]
        }
      ],
      "game": {
        "type": "sentence-picture",
        "items": [
          {
            "id": "g1",
            "en": "I like pizza.",
            "he": "אני אוהב/ת פיצה.",
            "answerWordId": "pizza",
            "optionWordIds": [
              "pizza",
              "bread",
              "milk",
              "apple"
            ]
          },
          {
            "id": "g2",
            "en": "Can I have water, please?",
            "he": "אפשר לקבל מים, בבקשה?",
            "answerWordId": "water",
            "optionWordIds": [
              "water",
              "milk",
              "apple",
              "bread"
            ]
          },
          {
            "id": "g3",
            "en": "She likes apples.",
            "he": "היא אוהבת תפוחים.",
            "answerWordId": "apple",
            "optionWordIds": [
              "apple",
              "pizza",
              "water",
              "bread"
            ]
          },
          {
            "id": "g4",
            "en": "I eat bread in the kitchen.",
            "he": "אני אוכל/ת לחם במטבח.",
            "answerWordId": "bread",
            "optionWordIds": [
              "bread",
              "milk",
              "pizza",
              "house"
            ]
          }
        ]
      }
    },
    {
      "lessonId": 4,
      "title": "School Stuff",
      "titleHe": "ציוד לבית ספר",
      "introHe": "היום נלמד את המילים של בית הספר והכיתה.",
      "reviewWords": [
        "like",
        "water"
      ],
      "newWords": [
        {
          "id": "bag",
          "en": "bag",
          "he": "תיק",
          "imagePrompt": "cartoon icon of a school backpack",
          "audioText": "bag"
        },
        {
          "id": "pencil",
          "en": "pencil",
          "he": "עיפרון",
          "imagePrompt": "cartoon icon of a yellow pencil",
          "audioText": "pencil"
        },
        {
          "id": "book",
          "en": "book",
          "he": "ספר",
          "imagePrompt": "cartoon icon of an open book",
          "audioText": "book"
        },
        {
          "id": "teacher",
          "en": "teacher",
          "he": "מורה",
          "imagePrompt": "cartoon icon of a teacher next to a blackboard",
          "audioText": "teacher"
        },
        {
          "id": "class",
          "en": "class",
          "he": "כיתה",
          "imagePrompt": "cartoon icon of a classroom with desks and a blackboard",
          "audioText": "class"
        },
        {
          "id": "friend",
          "en": "friend",
          "he": "חבר/ה",
          "imagePrompt": "cartoon icon of two friends holding hands",
          "audioText": "friend"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I have a new bag.",
          "he": "יש לי תיק חדש.",
          "matchImagePrompt": "cartoon icon of a school backpack",
          "matchWordId": "bag",
          "distractorWordIds": [
            "book",
            "pencil"
          ]
        },
        {
          "id": "s2",
          "en": "My teacher is nice.",
          "he": "המורה שלי נחמד/ה.",
          "matchImagePrompt": "cartoon icon of a teacher next to a blackboard",
          "matchWordId": "teacher",
          "distractorWordIds": [
            "friend",
            "class"
          ]
        },
        {
          "id": "s3",
          "en": "This is my friend.",
          "he": "זה/זאת החבר/ה שלי.",
          "matchImagePrompt": "cartoon icon of two friends holding hands",
          "matchWordId": "friend",
          "distractorWordIds": [
            "teacher",
            "book"
          ]
        },
        {
          "id": "s4",
          "en": "I like my class.",
          "he": "אני אוהב/ת את הכיתה שלי.",
          "matchImagePrompt": "cartoon icon of a classroom with desks",
          "matchWordId": "class",
          "distractorWordIds": [
            "bag",
            "pencil"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: זה החבר שלי",
          "expectedPhrase": "this is my friend",
          "acceptableVariants": [
            "that is my friend",
            "this is my best friend"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: יש לי תיק חדש",
          "expectedPhrase": "i have a new bag",
          "acceptableVariants": [
            "i have new bag",
            "i have got a new bag"
          ]
        }
      ],
      "game": {
        "type": "fill-word",
        "items": [
          {
            "id": "g1",
            "textBefore": "I have a new",
            "textAfter": ".",
            "he": "יש לי תיק חדש.",
            "answerWordId": "bag",
            "optionWordIds": [
              "bag",
              "book",
              "pencil"
            ]
          },
          {
            "id": "g2",
            "textBefore": "My",
            "textAfter": "is nice.",
            "he": "המורה שלי נחמד/ה.",
            "answerWordId": "teacher",
            "optionWordIds": [
              "teacher",
              "friend",
              "class"
            ]
          },
          {
            "id": "g3",
            "textBefore": "I read a",
            "textAfter": "in class.",
            "he": "אני קורא/ת ספר בכיתה.",
            "answerWordId": "book",
            "optionWordIds": [
              "book",
              "bag",
              "teacher"
            ]
          },
          {
            "id": "g4",
            "textBefore": "I write with a",
            "textAfter": ".",
            "he": "אני כותב/ת עם עיפרון.",
            "answerWordId": "pencil",
            "optionWordIds": [
              "pencil",
              "book",
              "friend"
            ]
          }
        ]
      }
    },
    {
      "lessonId": 5,
      "title": "Animals",
      "titleHe": "חיות",
      "introHe": "היום נלמד שמות של חיות באנגלית.",
      "reviewWords": [
        "friend",
        "book"
      ],
      "newWords": [
        {
          "id": "dog",
          "en": "dog",
          "he": "כלב",
          "imagePrompt": "cartoon icon of a friendly brown dog",
          "audioText": "dog"
        },
        {
          "id": "cat",
          "en": "cat",
          "he": "חתול",
          "imagePrompt": "cartoon icon of a cute orange cat",
          "audioText": "cat"
        },
        {
          "id": "bird",
          "en": "bird",
          "he": "ציפור",
          "imagePrompt": "cartoon icon of a small blue bird",
          "audioText": "bird"
        },
        {
          "id": "fish",
          "en": "fish",
          "he": "דג",
          "imagePrompt": "cartoon icon of an orange fish in water",
          "audioText": "fish"
        },
        {
          "id": "lion",
          "en": "lion",
          "he": "אריה",
          "imagePrompt": "cartoon icon of a lion with a big mane",
          "audioText": "lion"
        },
        {
          "id": "rabbit",
          "en": "rabbit",
          "he": "ארנב",
          "imagePrompt": "cartoon icon of a white rabbit with long ears",
          "audioText": "rabbit"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I have a dog.",
          "he": "יש לי כלב.",
          "matchImagePrompt": "cartoon icon of a friendly brown dog",
          "matchWordId": "dog",
          "distractorWordIds": [
            "cat",
            "rabbit"
          ]
        },
        {
          "id": "s2",
          "en": "The cat is small.",
          "he": "החתול קטן.",
          "matchImagePrompt": "cartoon icon of a cute orange cat",
          "matchWordId": "cat",
          "distractorWordIds": [
            "dog",
            "bird"
          ]
        },
        {
          "id": "s3",
          "en": "Look at the bird!",
          "he": "תראה/י את הציפור!",
          "matchImagePrompt": "cartoon icon of a small blue bird",
          "matchWordId": "bird",
          "distractorWordIds": [
            "fish",
            "lion"
          ]
        },
        {
          "id": "s4",
          "en": "The lion is big.",
          "he": "האריה גדול.",
          "matchImagePrompt": "cartoon icon of a lion with a big mane",
          "matchWordId": "lion",
          "distractorWordIds": [
            "rabbit",
            "fish"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: יש לי כלב",
          "expectedPhrase": "i have a dog",
          "acceptableVariants": [
            "i have dog",
            "i have got a dog"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: החתול קטן",
          "expectedPhrase": "the cat is small",
          "acceptableVariants": [
            "cat is small",
            "the cat is very small"
          ]
        }
      ],
      "game": {
        "type": "matching",
        "wordIds": [
          "dog",
          "cat",
          "bird",
          "fish",
          "lion",
          "rabbit"
        ]
      }
    },
    {
      "lessonId": 6,
      "title": "Body & Feelings",
      "titleHe": "גוף ורגשות",
      "introHe": "היום נלמד להגיד איך אנחנו מרגישים ואיך קוראים לאיברי הגוף.",
      "reviewWords": [
        "dog",
        "big"
      ],
      "newWords": [
        {
          "id": "hand",
          "en": "hand",
          "he": "יד",
          "imagePrompt": "cartoon icon of an open waving hand",
          "audioText": "hand"
        },
        {
          "id": "head",
          "en": "head",
          "he": "ראש",
          "imagePrompt": "cartoon icon of a child's head in profile",
          "audioText": "head"
        },
        {
          "id": "eyes",
          "en": "eyes",
          "he": "עיניים",
          "imagePrompt": "cartoon icon of two big brown eyes",
          "audioText": "eyes"
        },
        {
          "id": "happy",
          "en": "happy",
          "he": "שמח/ה",
          "imagePrompt": "cartoon icon of a big smiling happy face",
          "audioText": "happy"
        },
        {
          "id": "sad",
          "en": "sad",
          "he": "עצוב/ה",
          "imagePrompt": "cartoon icon of a sad face with a tear",
          "audioText": "sad"
        },
        {
          "id": "tired",
          "en": "tired",
          "he": "עייף/ה",
          "imagePrompt": "cartoon icon of a sleepy yawning face",
          "audioText": "tired"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I am happy.",
          "he": "אני שמח/ה.",
          "matchImagePrompt": "cartoon icon of a big smiling happy face",
          "matchWordId": "happy",
          "distractorWordIds": [
            "sad",
            "tired"
          ]
        },
        {
          "id": "s2",
          "en": "My eyes are brown.",
          "he": "העיניים שלי חומות.",
          "matchImagePrompt": "cartoon icon of two big brown eyes",
          "matchWordId": "eyes",
          "distractorWordIds": [
            "hand",
            "head"
          ]
        },
        {
          "id": "s3",
          "en": "I am tired today.",
          "he": "אני עייף/ה היום.",
          "matchImagePrompt": "cartoon icon of a sleepy yawning face",
          "matchWordId": "tired",
          "distractorWordIds": [
            "happy",
            "sad"
          ]
        },
        {
          "id": "s4",
          "en": "She is sad.",
          "he": "היא עצובה.",
          "matchImagePrompt": "cartoon icon of a sad face with a tear",
          "matchWordId": "sad",
          "distractorWordIds": [
            "happy",
            "tired"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: אני שמח/ה",
          "expectedPhrase": "i am happy",
          "acceptableVariants": [
            "im happy",
            "i'm happy",
            "i am very happy"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: אני עייף/ה היום",
          "expectedPhrase": "i am tired today",
          "acceptableVariants": [
            "im tired today",
            "i'm tired today",
            "i am tired"
          ]
        }
      ],
      "game": {
        "type": "sentence-picture",
        "items": [
          {
            "id": "g1",
            "en": "I am happy.",
            "he": "אני שמח/ה.",
            "answerWordId": "happy",
            "optionWordIds": [
              "happy",
              "sad",
              "tired",
              "eyes"
            ]
          },
          {
            "id": "g2",
            "en": "She is sad.",
            "he": "היא עצובה.",
            "answerWordId": "sad",
            "optionWordIds": [
              "sad",
              "happy",
              "hand",
              "tired"
            ]
          },
          {
            "id": "g3",
            "en": "I am tired today.",
            "he": "אני עייף/ה היום.",
            "answerWordId": "tired",
            "optionWordIds": [
              "tired",
              "happy",
              "sad",
              "head"
            ]
          },
          {
            "id": "g4",
            "en": "My eyes are brown.",
            "he": "העיניים שלי חומות.",
            "answerWordId": "eyes",
            "optionWordIds": [
              "eyes",
              "hand",
              "head",
              "happy"
            ]
          }
        ]
      }
    },
    {
      "lessonId": 7,
      "title": "Colors, Numbers & Weather",
      "titleHe": "צבעים, מספרים ומזג אוויר",
      "introHe": "היום נלמד צבעים, מספרים ומזג אוויר.",
      "reviewWords": [
        "happy",
        "cat"
      ],
      "newWords": [
        {
          "id": "red",
          "en": "red",
          "he": "אדום",
          "imagePrompt": "cartoon icon of a red paint splash",
          "audioText": "red"
        },
        {
          "id": "blue",
          "en": "blue",
          "he": "כחול",
          "imagePrompt": "cartoon icon of a blue paint splash",
          "audioText": "blue"
        },
        {
          "id": "one",
          "en": "one",
          "he": "אחת",
          "imagePrompt": "cartoon icon of the number one with one star",
          "audioText": "one"
        },
        {
          "id": "two",
          "en": "two",
          "he": "שתיים",
          "imagePrompt": "cartoon icon of the number two with two stars",
          "audioText": "two"
        },
        {
          "id": "three",
          "en": "three",
          "he": "שלוש",
          "imagePrompt": "cartoon icon of the number three with three stars",
          "audioText": "three"
        },
        {
          "id": "sunny",
          "en": "sunny",
          "he": "שמשי",
          "imagePrompt": "cartoon icon of a bright smiling sun",
          "audioText": "sunny"
        },
        {
          "id": "rainy",
          "en": "rainy",
          "he": "גשום",
          "imagePrompt": "cartoon icon of a cloud with rain drops",
          "audioText": "rainy"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I have two dogs.",
          "he": "יש לי שני כלבים.",
          "matchImagePrompt": "cartoon icon of the number two",
          "matchWordId": "two",
          "distractorWordIds": [
            "one",
            "three"
          ]
        },
        {
          "id": "s2",
          "en": "The sky is blue.",
          "he": "השמיים כחולים.",
          "matchImagePrompt": "cartoon icon of a blue paint splash",
          "matchWordId": "blue",
          "distractorWordIds": [
            "red",
            "sunny"
          ]
        },
        {
          "id": "s3",
          "en": "It is sunny today.",
          "he": "היום שמשי.",
          "matchImagePrompt": "cartoon icon of a bright smiling sun",
          "matchWordId": "sunny",
          "distractorWordIds": [
            "rainy",
            "blue"
          ]
        },
        {
          "id": "s4",
          "en": "I have three books.",
          "he": "יש לי שלושה ספרים.",
          "matchImagePrompt": "cartoon icon of the number three",
          "matchWordId": "three",
          "distractorWordIds": [
            "two",
            "one"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: השמיים כחולים",
          "expectedPhrase": "the sky is blue",
          "acceptableVariants": [
            "sky is blue",
            "the sky is very blue"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: היום שמשי",
          "expectedPhrase": "it is sunny today",
          "acceptableVariants": [
            "its sunny today",
            "it's sunny today",
            "it is sunny"
          ]
        }
      ],
      "game": {
        "type": "matching",
        "wordIds": [
          "red",
          "blue",
          "one",
          "two",
          "three",
          "sunny",
          "rainy"
        ]
      }
    },
    {
      "lessonId": 8,
      "title": "My Day",
      "titleHe": "היום שלי",
      "introHe": "השיעור האחרון! היום נספר על כל היום שלנו באנגלית.",
      "reviewWords": [
        "happy",
        "family",
        "dog"
      ],
      "newWords": [
        {
          "id": "morning",
          "en": "morning",
          "he": "בוקר",
          "imagePrompt": "cartoon icon of a sun rising over hills",
          "audioText": "morning"
        },
        {
          "id": "get_up",
          "en": "get up",
          "he": "קם/ה",
          "imagePrompt": "cartoon icon of a child getting out of bed and stretching",
          "audioText": "get up"
        },
        {
          "id": "eat",
          "en": "eat",
          "he": "אוכל/ת",
          "imagePrompt": "cartoon icon of a plate with a fork and a spoon",
          "audioText": "eat"
        },
        {
          "id": "play",
          "en": "play",
          "he": "משחק/ת",
          "imagePrompt": "cartoon icon of a colorful ball and toy blocks",
          "audioText": "play"
        },
        {
          "id": "sleep",
          "en": "sleep",
          "he": "ישן/ה",
          "imagePrompt": "cartoon icon of a pillow with Z Z Z letters",
          "audioText": "sleep"
        },
        {
          "id": "night",
          "en": "night",
          "he": "לילה",
          "imagePrompt": "cartoon icon of a moon and stars in a dark sky",
          "audioText": "night"
        }
      ],
      "sentences": [
        {
          "id": "s1",
          "en": "I get up in the morning.",
          "he": "אני קם/ה בבוקר.",
          "matchImagePrompt": "cartoon icon of a child getting out of bed",
          "matchWordId": "get_up",
          "distractorWordIds": [
            "sleep",
            "night"
          ]
        },
        {
          "id": "s2",
          "en": "I eat breakfast.",
          "he": "אני אוכל/ת ארוחת בוקר.",
          "matchImagePrompt": "cartoon icon of a plate with a fork and a spoon",
          "matchWordId": "eat",
          "distractorWordIds": [
            "play",
            "sleep"
          ]
        },
        {
          "id": "s3",
          "en": "I play with my dog.",
          "he": "אני משחק/ת עם הכלב שלי.",
          "matchImagePrompt": "cartoon icon of a colorful ball and toy blocks",
          "matchWordId": "play",
          "distractorWordIds": [
            "eat",
            "morning"
          ]
        },
        {
          "id": "s4",
          "en": "I sleep at night.",
          "he": "אני ישן/ה בלילה.",
          "matchImagePrompt": "cartoon icon of a moon and stars",
          "matchWordId": "night",
          "distractorWordIds": [
            "morning",
            "eat"
          ]
        }
      ],
      "speakingPrompts": [
        {
          "id": "sp1",
          "promptHe": "תגיד/י: אני קם/ה בבוקר",
          "expectedPhrase": "i get up in the morning",
          "acceptableVariants": [
            "i get up in morning",
            "i wake up in the morning"
          ]
        },
        {
          "id": "sp2",
          "promptHe": "תגיד/י: אני משחק/ת עם הכלב שלי",
          "expectedPhrase": "i play with my dog",
          "acceptableVariants": [
            "i play with the dog",
            "i play with my dogs"
          ]
        }
      ],
      "game": {
        "type": "fill-word",
        "isFinalRecap": true,
        "recapTitleHe": "היום שלי — לפי הסדר",
        "items": [
          {
            "id": "g1",
            "textBefore": "I get up in the",
            "textAfter": ".",
            "he": "אני קם/ה בבוקר.",
            "answerWordId": "morning",
            "optionWordIds": [
              "morning",
              "night",
              "sleep"
            ]
          },
          {
            "id": "g2",
            "textBefore": "I",
            "textAfter": "breakfast with my family.",
            "he": "אני אוכל/ת ארוחת בוקר עם המשפחה שלי.",
            "answerWordId": "eat",
            "optionWordIds": [
              "eat",
              "play",
              "sleep"
            ]
          },
          {
            "id": "g3",
            "textBefore": "I",
            "textAfter": "with my dog. I am happy!",
            "he": "אני משחק/ת עם הכלב שלי. אני שמח/ה!",
            "answerWordId": "play",
            "optionWordIds": [
              "play",
              "eat",
              "get_up"
            ]
          },
          {
            "id": "g4",
            "textBefore": "I",
            "textAfter": "at night.",
            "he": "אני ישן/ה בלילה.",
            "answerWordId": "sleep",
            "optionWordIds": [
              "sleep",
              "play",
              "morning"
            ]
          }
        ]
      }
    }
  ],
  "extraWords": {
    "_comment": "מילים שמופיעות במשפטים של השיעורים אך לא נלמדות כמילה חדשה בפני עצמה. הן נחוצות כדי ש-reviewWords יוכל להפנות אליהן (למשל 'big' בשיעור 6).",
    "words": [
      {
        "id": "big",
        "en": "big",
        "he": "גדול",
        "imagePrompt": "cartoon icon of a big elephant next to a small mouse",
        "audioText": "big"
      }
    ]
  }
};
