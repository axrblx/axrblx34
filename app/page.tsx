"use client"

import { motion, useScroll, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Heart, Star, Music, Trophy, Target, Gamepad2 } from "lucide-react"

export default function MinionLovePage() {
  const [gameScore, setGameScore] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)
  const { scrollYProgress } = useScroll()

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-yellow-400 to-blue-400 overflow-hidden relative">
      {/* Score Display */}
      <ScoreDisplay score={gameScore} />

      {/* Epic Hero Section */}
      <EpicHeroSection />

      {/* Banana Catching Game */}
      <BananaCatchingGame onScoreUpdate={setGameScore} />

      {/* Interactive Love Puzzle */}
      <LovePuzzleSection />

      {/* Minion Dance Party */}
      <MinionDanceParty />

      {/* Memory Game */}
      <MemoryGameSection onScoreUpdate={setGameScore} />

      {/* 3D Floating Hearts Game */}
      <FloatingHeartsGame onScoreUpdate={setGameScore} />

      {/* Epic Final Declaration */}
      <EpicFinalSection />

      {/* Dynamic Background Effects */}
      <DynamicBackground />

      {/* Fireworks Effect */}
      <AnimatePresence>{showFireworks && <FireworksEffect />}</AnimatePresence>
    </div>
  )
}

function ScoreDisplay({ score }: { score: number }) {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-6 py-3 border-4 border-blue-600 shadow-2xl"
      animate={{
        scale: score > 0 ? [1, 1.2, 1] : 1,
        rotate: score > 0 ? [0, 5, -5, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-blue-800" />
        <span className="text-2xl font-bold text-blue-800">{score}</span>
        <Star className="w-6 h-6 text-blue-800 fill-current" />
      </div>
    </motion.div>
  )
}

function EpicHeroSection() {
  const [isExploding, setIsExploding] = useState(false)

  const handleExplosion = () => {
    setIsExploding(true)
    setTimeout(() => setIsExploding(false), 2000)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="text-center z-10"
        initial={{ scale: 0, rotate: -360 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2, type: "spring", bounce: 0.8 }}
      >
        <motion.h1
          className="text-6xl md:text-9xl font-bold text-blue-800 mb-4 cursor-pointer select-none"
          animate={{
            textShadow: [
              "0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24",
              "0 0 40px #f59e0b, 0 0 80px #f59e0b, 0 0 120px #f59e0b",
              "0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24",
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          onClick={handleExplosion}
          whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
        >
          ¡BANANA LOVE!
        </motion.h1>

        <motion.div
          className="relative"
          animate={isExploding ? { scale: [1, 2, 1], rotate: 360 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-80 h-80 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-8 border-blue-600 flex items-center justify-center cursor-pointer shadow-2xl"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                "0 0 0 20px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            onClick={handleExplosion}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="text-8xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              👁️
            </motion.div>
          </motion.div>

          {isExploding && (
            <motion.div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  {["💛", "🍌", "⭐", "💫", "✨"][Math.floor(Math.random() * 5)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          🍌
        </motion.div>
      ))}
    </section>
  )
}

function BananaCatchingGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [bananas, setBananas] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
    setBananas([])
  }

  const catchBanana = (id: number) => {
    setBananas((prev) => prev.filter((banana) => banana.id !== id))
    const newScore = score + 10
    setScore(newScore)
    onScoreUpdate(newScore)
  }

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      setBananas((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
        },
      ])
    }, 800)

    return () => clearInterval(interval)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      setBananas((prev) => prev.filter((banana) => banana.y < 100))
    }, 100)

    return () => clearInterval(interval)
  }, [gameActive])

  return (
    <section ref={ref} className="min-h-screen py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-blue-800 mb-8">¡Atrapa las Bananas del Amor! 🍌</h2>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-3xl p-8 border-8 border-blue-600 relative overflow-hidden h-96">
          {!gameActive ? (
            <motion.div className="flex flex-col items-center justify-center h-full">
              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl border-4 border-yellow-400"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.7)", "0 0 0 20px rgba(59, 130, 246, 0)"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Gamepad2 className="w-8 h-8 inline mr-2" />
                ¡JUGAR!
              </motion.button>
              <p className="text-blue-800 mt-4 text-xl font-semibold">
                ¡Atrapa todas las bananas que puedas en 30 segundos!
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold text-blue-800">Puntos: {score}</div>
                <div className="text-2xl font-bold text-red-600">Tiempo: {timeLeft}s</div>
              </div>

              {bananas.map((banana) => (
                <motion.div
                  key={banana.id}
                  className="absolute text-6xl cursor-pointer select-none"
                  style={{ left: `${banana.x}%` }}
                  initial={{ y: -50 }}
                  animate={{ y: 350 }}
                  transition={{ duration: 4, ease: "linear" }}
                  onClick={() => catchBanana(banana.id)}
                  whileHover={{ scale: 1.3, rotate: 180 }}
                  whileTap={{ scale: 0.8 }}
                >
                  🍌
                </motion.div>
              ))}
            </>
          )}
        </div>

        {score > 0 && !gameActive && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 text-center">
            <h3 className="text-3xl font-bold text-blue-800 mb-4">
              ¡Increíble! Atrapaste {score / 10} bananas del amor! 💛
            </h3>
            <motion.button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ¡Jugar de Nuevo!
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

function LovePuzzleSection() {
  const [pieces, setPieces] = useState([
    { id: 1, text: "Eres", placed: false, correctPos: 0 },
    { id: 2, text: "mi", placed: false, correctPos: 1 },
    { id: 3, text: "Minion", placed: false, correctPos: 2 },
    { id: 4, text: "favorito", placed: false, correctPos: 3 },
    { id: 5, text: "💛", placed: false, correctPos: 4 },
  ])
  const [slots, setSlots] = useState(Array(5).fill(null))
  const [completed, setCompleted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleDrop = (pieceId: number, slotIndex: number) => {
    const piece = pieces.find((p) => p.id === pieceId)
    if (!piece || slots[slotIndex] !== null) return

    const newSlots = [...slots]
    newSlots[slotIndex] = piece

    const newPieces = pieces.map((p) => (p.id === pieceId ? { ...p, placed: true } : p))

    setSlots(newSlots)
    setPieces(newPieces)

    // Check if completed correctly
    const isComplete = newSlots.every((slot, index) => slot && slot.correctPos === index)

    if (isComplete) {
      setCompleted(true)
    }
  }

  const resetPuzzle = () => {
    setPieces(pieces.map((p) => ({ ...p, placed: false })))
    setSlots(Array(5).fill(null))
    setCompleted(false)
  }

  return (
    <section ref={ref} className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-blue-800 mb-12">¡Completa el Mensaje de Amor! 💝</h2>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-8 border-yellow-400 shadow-2xl">
          {/* Slots */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 min-h-[80px]">
            {slots.map((slot, index) => (
              <motion.div
                key={index}
                className={`w-32 h-16 border-4 border-dashed border-blue-400 rounded-xl flex items-center justify-center text-xl font-bold ${
                  slot ? "bg-yellow-200 border-solid border-green-500" : "bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                animate={slot ? { scale: [1, 1.1, 1] } : {}}
              >
                {slot ? slot.text : `Slot ${index + 1}`}
              </motion.div>
            ))}
          </div>

          {/* Pieces */}
          {!completed && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {pieces
                .filter((p) => !p.placed)
                .map((piece) => (
                  <motion.button
                    key={piece.id}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-xl text-xl font-bold text-blue-800 border-4 border-blue-600 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      // Find first empty slot
                      const emptySlotIndex = slots.findIndex((slot) => slot === null)
                      if (emptySlotIndex !== -1) {
                        handleDrop(piece.id, emptySlotIndex)
                      }
                    }}
                  >
                    {piece.text}
                  </motion.button>
                ))}
            </div>
          )}

          {completed && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-green-600 mb-4">¡PERFECTO! 🎉</h3>
              <p className="text-2xl text-blue-700 mb-6">¡Has completado el mensaje de amor!</p>
              <motion.button
                onClick={resetPuzzle}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Jugar de Nuevo!
              </motion.button>
            </motion.div>
          )}

          {!completed && (
            <motion.button
              onClick={resetPuzzle}
              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-full font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reiniciar
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function MinionDanceParty() {
  const [dancing, setDancing] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const minions = [
    { id: 1, emoji: "👁️", name: "Kevin" },
    { id: 2, emoji: "👀", name: "Stuart" },
    { id: 3, emoji: "👁️", name: "Bob" },
    { id: 4, emoji: "👀", name: "Dave" },
    { id: 5, emoji: "👁️", name: "Jerry" },
    { id: 6, emoji: "👀", name: "Tim" },
  ]

  return (
    <section ref={ref} className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-blue-800 mb-12">¡Fiesta de Baile Minion! 🕺💃</h2>

        <motion.button
          onClick={() => setDancing(!dancing)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-6 rounded-full text-2xl font-bold mb-12 shadow-2xl border-4 border-yellow-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={
            dancing
              ? {
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{ duration: 0.5, repeat: dancing ? Number.POSITIVE_INFINITY : 0 }}
        >
          <Music className="w-8 h-8 inline mr-2" />
          {dancing ? "¡STOP!" : "¡BAILA!"}
        </motion.button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {minions.map((minion, index) => (
            <motion.div
              key={minion.id}
              className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl p-6 border-8 border-blue-600 shadow-2xl"
              animate={
                dancing
                  ? {
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.2, 0.9, 1.1, 1],
                      y: [0, -20, 0, -10, 0],
                    }
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={{
                duration: dancing ? 0.8 : 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="text-8xl mb-4"
                animate={
                  dancing
                    ? {
                        rotate: [0, 360, -360, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: dancing ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
              >
                {minion.emoji}
              </motion.div>
              <h3 className="text-2xl font-bold text-blue-800">{minion.name}</h3>

              {dancing && (
                <motion.div
                  className="mt-2 text-4xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  🎵
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {dancing && (
          <motion.div
            className="mt-12 text-6xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          >
            🎉 ¡TODOS BAILAN POR TI! 🎉
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

function MemoryGameSection({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const emojis = ["💛", "🍌", "👁️", "⭐", "💝", "🎉", "✨", "🎵"]

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis]
    const shuffled = gameEmojis.sort(() => Math.random() - 0.5)
    const newCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }))
    setCards(newCards)
    setFlippedCards([])
    setScore(0)
    setGameStarted(true)
  }

  const flipCard = (id: number) => {
    if (flippedCards.length === 2) return
    if (cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[first].matched = true
          matchedCards[second].matched = true
          setCards(matchedCards)
          setFlippedCards([])
          const newScore = score + 20
          setScore(newScore)
          onScoreUpdate(newScore)
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[first].flipped = false
          resetCards[second].flipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <section ref={ref} className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-blue-800 mb-8">¡Juego de Memoria del Amor! 🧠💛</h2>

        {!gameStarted ? (
          <motion.button
            onClick={initializeGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl border-4 border-yellow-400"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
          >
            <Target className="w-8 h-8 inline mr-2" />
            ¡EMPEZAR JUEGO!
          </motion.button>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-8 border-yellow-400">
            <div className="text-2xl font-bold text-blue-800 mb-6">Puntos: {score}</div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`aspect-square rounded-xl border-4 cursor-pointer flex items-center justify-center text-4xl font-bold ${
                    card.flipped || card.matched ? "bg-yellow-300 border-green-500" : "bg-blue-500 border-blue-700"
                  }`}
                  onClick={() => flipCard(card.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    card.matched
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 360, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {card.flipped || card.matched ? card.emoji : "?"}
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={initializeGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nuevo Juego
            </motion.button>
          </div>
        )}
      </motion.div>
    </section>
  )
}

function FloatingHeartsGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(20)
    setHearts([])
  }

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== id))
    const newScore = score + 15
    setScore(newScore)
    onScoreUpdate(newScore)
  }

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 100,
          speed: Math.random() * 2 + 1,
        },
      ])
    }, 600)

    return () => clearInterval(interval)
  }, [gameActive])

  return (
    <section ref={ref} className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-blue-800 mb-8">¡Atrapa los Corazones Flotantes! 💕</h2>

        <div className="bg-gradient-to-br from-pink-200 to-purple-300 rounded-3xl p-8 border-8 border-yellow-400 relative overflow-hidden h-96">
          {!gameActive ? (
            <motion.div className="flex flex-col items-center justify-center h-full">
              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl border-4 border-yellow-400"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: ["0 0 0 0 rgba(236, 72, 153, 0.7)", "0 0 0 20px rgba(236, 72, 153, 0)"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-8 h-8 inline mr-2 fill-current" />
                ¡ATRAPAR AMOR!
              </motion.button>
              <p className="text-purple-800 mt-4 text-xl font-semibold">¡Atrapa todos los corazones en 20 segundos!</p>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold text-purple-800">Amor: {score}</div>
                <div className="text-2xl font-bold text-red-600">Tiempo: {timeLeft}s</div>
              </div>

              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute text-6xl cursor-pointer select-none"
                  style={{ left: `${heart.x}%` }}
                  initial={{ y: heart.y }}
                  animate={{ y: -50 }}
                  transition={{ duration: 4 / heart.speed, ease: "linear" }}
                  onClick={() => catchHeart(heart.id)}
                  whileHover={{ scale: 1.5, rotate: 360 }}
                  whileTap={{ scale: 0.8 }}
                >
                  💖
                </motion.div>
              ))}
            </>
          )}
        </div>

        {score > 0 && !gameActive && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 text-center">
            <h3 className="text-3xl font-bold text-purple-800 mb-4">
              ¡Increíble! Atrapaste {score / 15} corazones! 💖
            </h3>
            <motion.button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ¡Más Amor!
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

function EpicFinalSection() {
  const [showExplosion, setShowExplosion] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const triggerExplosion = () => {
    setShowExplosion(true)
    setTimeout(() => setShowExplosion(false), 3000)
  }

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, type: "spring" }}
        className="text-center max-w-4xl relative z-10"
      >
        <motion.h1
          className="text-6xl md:text-9xl font-bold text-blue-800 mb-8 cursor-pointer"
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px #fbbf24, 0 0 40px #fbbf24",
              "0 0 40px #f59e0b, 0 0 80px #f59e0b",
              "0 0 20px #fbbf24, 0 0 40px #fbbf24",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          onClick={triggerExplosion}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          TE AMO INFINITO
        </motion.h1>

        <motion.div
          className="relative mb-8"
          animate={showExplosion ? { scale: [1, 2, 1], rotate: 720 } : {}}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="w-40 h-40 mx-auto bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center border-8 border-yellow-400 shadow-2xl cursor-pointer"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 30px rgba(239, 68, 68, 0)"],
            }}
            transition={{
              rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
            onClick={triggerExplosion}
            whileHover={{ scale: 1.3 }}
          >
            <Heart className="w-20 h-20 text-white fill-current" />
          </motion.div>

          {showExplosion && (
            <motion.div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 600,
                    y: (Math.random() - 0.5) * 600,
                    rotate: Math.random() * 720,
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 3, ease: "easeOut" }}
                >
                  {["💛", "💖", "✨", "🌟", "💫", "🎉", "🍌", "👁️"][Math.floor(Math.random() * 8)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.p
          className="text-3xl md:text-4xl text-blue-700 mb-8 font-bold"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Eres mi banana favorita en este mundo de Minions 🍌👁️
        </motion.p>

        <motion.div
          className="flex justify-center items-center gap-8 text-8xl mb-8"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            🍌
          </motion.span>
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
            <Heart className="w-20 h-20 text-red-500 fill-current" />
          </motion.div>
          <motion.span
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            👁️
          </motion.span>
        </motion.div>

        <motion.div
          className="text-2xl text-blue-600 font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          🎵 "Banana na na na, te amo na na na" 🎵
        </motion.div>
      </motion.div>
    </section>
  )
}

function DynamicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          {["💛", "🍌", "⭐", "✨", "💫"][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  )
}

function FireworksEffect() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ["#fbbf24", "#3b82f6", "#ef4444", "#10b981", "#8b5cf6"][Math.floor(Math.random() * 5)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 1,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  )
}
