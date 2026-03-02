---
date: 2026-02-23
description: I argue that numbers can be thought of as a form of compression
emoji: 🗜️
---
# Numbers are compression


Recently, I've been playing an incremental game called [Antimatter Dimensions](https://ivark.github.io/AntimatterDimensions/), which got me thinking more deeply about numbers.

![Antimatter Dimensions](./ad_game.png)

It's very difficult to perceive a world without numbers today. How could anyone go about their daily business without counting? How did the shepherd count his sheep to make sure none wandered off? I've actually wondered about that for a long time, and I think I know the answer. First, take a look below:

```
🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑

🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑
```

Our visual processing is very advanced. We can clearly tell that there is a difference between the upper row and the lower row. There are fewer sheep above, and 3 more sheep below. Under ideal circumstances, we can simply use visual processing to judge space. There are obvious issues with this though. Sheep may vary in size, position, there may be environmental features like grass and shrubbery obstructing parts of the picture, there may be rocks and topology differences causing the sheep to stand at uneven distances from each other, and finally just getting the sheep to line up at all sounds like a challenge.

```
🐑,.-🐑🐑!.🐑🐑ln🐑lm/.🐑..,🐑;:.🐑;🐑,,.

.🐑,🐑🐑🐑!!,🐑m🐑nl🐑,/🐑,🐑🐑🐑..🐑🐑,.
```

This has the same amount of sheep in each row, but it's much less clear which line has more and fewer by just looking. I personally believe that pre-counting humans relied on distinguishing sheep by their features, similar to how we distinguish people by their unique facial features. Instead of counting, a shepherd might take stock of his sheep by reducing a mental list of individuals. *There is betsy with the dirty hooves, there is shaun with the curly fleece, there is mary with the sulky face, but I haven't seen johnny with the long ears yet.* This is essentially like going through a mental check list. Numbers require less cognitive load, because they allow you to reduce each unique element to one equal abstract unit (sheep).

In order to create a number, you must (1) normalize each object to be counted. When counting sheep, it's probably best to work with integers, and consider each individual sheep one whole unit, regardless of size, age, etc. (2) for each unit, exactly once, add it's value to a total, and (3) represent the sum with a standardized system such as roman numerals, Arabic numerals, English number words, marks on a wall, etc.

All of these stages are lossy and irreversible. Once a sheep has been normalized, it's not possible to identify which sheep someone is talking about by its value unless exactly one sheep has that value. In the case of integers, all sheep have the same value "1". (2) also makes it impossible to extract the individual values from the total, and only (3) allows you to actually retrieve the total value.

The simplest [numeral system](https://en.wikipedia.org/wiki/Numeral_system) is the [unary numeral system](https://en.wikipedia.org/wiki/Unary_numeral_system), in which each unit is simply represented by a mark. `1, 2, 3, 4, 5... = |, ||, |||, ||||, |||||...`. This is essentially the sheep emoji example I used above:

```
🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑 = 10

🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑 = 13
```

It becomes difficult to read and write very large numbers, but chunking helps:

```
🐑🐑🐑🐑🐑 🐑🐑🐑🐑🐑 🐑🐑🐑🐑🐑 🐑🐑🐑🐑🐑

🐑🐑🐑🐑🐑 🐑🐑🐑🐑🐑 🐑🐑🐑🐑🐑 🐑🐑🐑🐑🐑 🐑🐑🐑
```

Arabic numerals assign one symbol to each possible variation of a chunk, and sets the chunk size to 10.

```
🐑 = 1
🐑🐑 = 2
🐑🐑🐑 = 3
🐑🐑🐑🐑 = 4
🐑🐑🐑🐑🐑 = 5
🐑🐑🐑🐑🐑🐑 = 6
🐑🐑🐑🐑🐑🐑🐑 = 7
🐑🐑🐑🐑🐑🐑🐑🐑 = 8
🐑🐑🐑🐑🐑🐑🐑🐑🐑 = 9
🐑🐑🐑🐑🐑🐑🐑🐑🐑🐑 = 10
```

It then adds digits representing chunks of chunks, chunks of chunks of chunks, and so on. This is a smart way of reusing symbols, and it allows numbers to grow infinitely in size. Roman numerals are limiting, because to express higher numbers, you need more symbols. Even a relatively low number, like 1883 becomes a complete mess in roman numerals `MDCCCLXXXIII`, while Arabic handles it just fine.

While both Arabic numerals and roman numerals can be considered lossless compression since they can be reversed to get the value without any loss of precision, numbers like `12 million`, `4k` or `1.04e87` are clearly results of *lossy* compression. The number `4173` can easily be compressed to `4k` or `4 thousand`, but the reverse, `4k` can not be decompressed into `4173`, because it's missing precision. All natural numbers are therefore being expressed with lossy compression. `1.02` might actually be `1.02012378...`, but recording the full depth of the fractional part of the number is impossible without infinite space to write on.

The unary numeral system can be thought of as a simple encoding, while all other numeral systems are compression. They reduce the size of the medium conveying the value.
