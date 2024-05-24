import classNames from "classnames";
import { useFteController } from "../../fte/hooks.ts";
import { Player } from "../../fte/types.ts";
import { useUpdateInterval } from "../../hooks.ts";
import { formatElapsed } from "../../time.ts";
import { QuakeTextFromBytes } from "../QuakeText.tsx";

export const ResponsiveScoreBanner = ({ scale }: { scale: number }) => {
  return (
    <div
      className={classNames("absolute origin-top w-full top-[4%]")}
      style={{ transform: `scale(${scale})` }}
    >
      <ScoreBanner />
    </div>
  );
};

export const ScoreBanner = () => {
  const fte = useFteController();
  useUpdateInterval(250);

  if (!fte) {
    return null;
  }

  let participants: Participant[];
  const state = fte.getClientState();

  if (state.teamplay > 0) {
    participants = fte.getTeams();
  } else {
    participants = fte.getPlayers().map(playerToParticipant);
  }

  if (participants.length < 2) {
    return null;
  }

  return (
    <div className="flex flex-col items-center pointer-events-none select-none">
      <div className="flex items-center font-mono">
        <Participant participant={participants[0]} index={0} />
        <Participant participant={participants[1]} index={1} />
      </div>
      <div className="text-center mt-1 app-text-shadow font-bold text-yellow-200">
        {formatElapsed(fte.getGameElapsedTime())}
      </div>
    </div>
  );
};

const Participant = ({
  participant,
  index,
}: {
  participant: Participant;
  index: number;
}) => {
  const isFirst = index % 2 === 0;

  return (
    <div className={"flex w-48 justify-end last:flex-row-reverse font-bold"}>
      <div className="flex items-center">
        <div
          className={classNames("px-2 py-0.5 bg-black/50", {
            "rounded-l pl-2.5": isFirst,
            "rounded-r pr-2.5": !isFirst,
          })}
        >
          <QuakeTextFromBytes name={participant.name} />
        </div>
      </div>
      <div
        className={classNames(
          `qw-bgcolor-${participant.topcolor}-${participant.bottomcolor} w-12 text-center text-lg font-bold app-text-shadow rounded-sm`,
          {
            "border-r border-black": isFirst,
          },
        )}
      >
        {participant.frags}
      </div>
    </div>
  );
};

type Participant = {
  name: number[];
  frags: number;
  topcolor: number;
  bottomcolor: number;
};

function playerToParticipant(player: Player): Participant {
  return {
    name: player.getName(),
    frags: player.frags,
    topcolor: player.topcolor,
    bottomcolor: player.bottomcolor,
  };
}
