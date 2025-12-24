# TSPLAB Optimization and Visualization Flow - Requirements v2

## 1. Instance Loading
- User loads a `TspInstance` into the system
- This instance becomes the problem to be solved

## 2. Optimization Execution
- **Trigger**: User clicks "Run" button OR app auto-starts on a default instance
- **Action**: Optimization process begins
- **Concurrency**: Only one optimization run is allowed at a time

## 3. Initial Tour Construction
- A `TourBuilder` (construction heuristic) creates the initial `Tour`
- This initial tour is the starting point for improvement

## 4. Dual-Tour Architecture
- **`currentTour`**: The tour being actively optimized by the algorithm
  - Lives in the optimization engine
  - Updates at computation speed (potentially very fast)
  - Not directly visualized
  
- **`visualizedTour`**: The tour currently displayed to the user
  - Lives in the visualization service
  - Updates at human perception speed with hardcoded delays
  - Lags behind `currentTour` by design
  - **Guarantee**: At completion, `visualizedTour` must equal `currentTour`

## 5. Decoupled Update Speeds
- Optimization operates at user-controlled speed (configurable via UI sleep delays)
- Visualization operates at hardcoded human-perceivable speed
- The lag between them allows users to follow the optimization process
- This decoupling is intentional and essential for user experience

## 6. Initial Tour Communication and Visualization
- `TourBuilder` notifies `TourVisualization` service when initial tour is ready
- Upon receiving the initial tour, `TourVisualization`:
  - Clears any existing visualization
  - **Immediately** renders the new initial tour (no delay)
  - Prepares to receive optimization moves

## 7. Local Search Optimization Process
- Local Search (LS) solver orchestrates the optimization
- For each iteration:
  - LS solver selects an improvement operator (e.g., 2-opt, 3-opt, Or-opt)
  - Operator evaluates `currentTour` and returns a `Move` object (not a new tour)
  - `Move` describes the transformation needed (e.g., "exchange 2 edges")
  - LS solver applies the `Move` to `currentTour` (in-place modification for performance)
  - Optional sleep delay (user-configurable) before next iteration

## 8. Move Communication to Visualizer
- After each move is applied to `currentTour`:
  - LS solver sends the `Move` to `TourVisualization` service
  - **All moves must be sent** - no sampling or skipping
  - This communication is asynchronous and non-blocking
  - Optimization continues immediately without waiting for visualization

## 9. Move Queue Management
- `TourVisualization` maintains an **unbounded FIFO queue** of pending moves
- Moves sent by optimizer are enqueued as they arrive
- Visualization processes moves from the queue at its own controlled pace
- Queue behavior:
  - **Enqueue**: Optimization adds moves (speed controlled by user via sleep delays)
  - **Dequeue**: Visualization applies moves to `visualizedTour` (hardcoded pace)
  - **No move dropping**: All moves must eventually be processed
  - **Backpressure handling**: Queue may grow during intensive optimization phases

## 10. Visualization Details
- During the improvement phase, the visualizer must show:
  - **Edges being removed** (visual feedback for deletion)
  - **Edges being inserted** (visual feedback for addition)
- Hardcoded delays between move visualizations ensure human comprehension
- No user controls for visualization speed or playback (pause/resume/replay not supported in v1)

## 11. User Controls
- **Optimization Speed Control**: Users can adjust sleep delays between operator applications
  - Faster: Shorter delays (optimization outpaces visualization significantly)
  - Slower: Longer delays (optimization and visualization stay closer in sync)
- **Pause/Resume**: Users can pause the optimization process
  - When paused, no new moves are generated
  - Visualization continues processing queued moves
  - Resume continues optimization from paused state

## 12. Completion and Synchronization
- When optimization completes:
  - LS solver stops generating new moves
  - Visualization continues processing all queued moves
  - **Guarantee**: `visualizedTour` must process every move in sequence
  - **No shortcuts**: Visualization cannot jump to final `currentTour` state
  - System indicates "Optimization Complete" status
  - System indicates "Visualization Complete" only after all moves are applied
- Final state: `currentTour === visualizedTour` (structurally identical)

---

## Key Design Principles

1. **Performance**: No tour cloning during optimization - in-place modifications only
2. **Separation of Concerns**: Optimization logic is independent of visualization
3. **Asynchronous Communication**: Optimizer and visualizer are decoupled via message passing
4. **User Experience**: Controlled optimization speed allows human comprehension
5. **Scalability**: Architecture handles large instances and long-running optimizations
6. **Completeness**: All moves are visualized - no information loss
7. **Controllability**: Users control optimization speed, not visualization speed

---

## System States

### Optimization States
- **IDLE**: No optimization running, waiting for user to start
- **CONSTRUCTING**: Building initial tour
- **OPTIMIZING**: Applying improvement moves to `currentTour`
- **PAUSED**: Optimization paused by user
- **COMPLETED**: All optimization moves generated

### Visualization States
- **IDLE**: No visualization active
- **DISPLAYING_INITIAL**: Rendering initial tour
- **PROCESSING_MOVES**: Applying moves from queue to `visualizedTour`
- **COMPLETED**: All moves processed, `visualizedTour === currentTour`

### Combined System States
- **Initial**: Optimization=IDLE, Visualization=IDLE
- **Construction**: Optimization=CONSTRUCTING, Visualization=IDLE
- **Initial Display**: Optimization=CONSTRUCTING, Visualization=DISPLAYING_INITIAL
- **Active Optimization**: Optimization=OPTIMIZING, Visualization=PROCESSING_MOVES
- **Paused**: Optimization=PAUSED, Visualization=PROCESSING_MOVES (continues)
- **Optimization Done**: Optimization=COMPLETED, Visualization=PROCESSING_MOVES
- **Fully Complete**: Optimization=COMPLETED, Visualization=COMPLETED

---

## Future Considerations (Not in v1)

- **Replay capability**: Allow users to replay optimization sequence
- **Visualization controls**: Pause, resume, speed adjustment for visualization
- **Skip to end**: Jump visualization to final state
- **Step-by-step mode**: Manual advance through moves
