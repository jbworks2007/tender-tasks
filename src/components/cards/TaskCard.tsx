import { LuCalendar, LuMessageSquare, LuPaperclip } from "react-icons/lu";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface TaskCardProps {
  title?: string;
  description?: string;
  status?: string;
  assignee?: string;
  priority?: string;
  date?: string;
  comments?: string[];
  attachments?: string[];
}

export default function TaskCard({
  title,
  description,
  status,
  assignee,
  priority,
  date,
  comments,
  attachments,
}: TaskCardProps) {
  return (
    <div className="mt-3 bg-[#1F2023] rounded-xl hover:border-t border-amber-300">
      <div className="upper-section">
        <div className="p-5">
          <div className="flex items-center justify-between gap-1">
            <div
              className={`rounded-full px-4 py-1 ${
                status == "in_progress" ? "bg-[#163642]" : status == "not_started" ? "bg-[#6A4029]" : "bg-amber-300"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full filter blur-[1px] 
                  ${
                    status == "in_progress" ? "bg-blue-500" : status == "not_started" ? "bg-orange-400" : "bg-amber-300"
                  }
                  `}
                ></div>
                <div className="ms-3 capitalize">{status?.replace("_", " ")}</div>
              </div>
            </div>
            <div className="p-1 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out">
              <HiEllipsisHorizontal size={25} />
            </div>
          </div>
          <div className="mt-2 text-2xl">{title}</div>
          <div className="mt-2 text-sm text-gray-300">{description}</div>
          <div className="mt-3 flex items-center justify-between">
            <div className="">Assignee</div>
            <div className="">{assignee}</div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="icon">
                <LuCalendar size={15} />
              </div>
              <div className="ms-2">{date}</div>
            </div>
            <div className={`rounded-sm px-2 text-sm capitalize ${priority == "low" ? "bg-green-700" : "bg-red-900"}`}>
              {priority}
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-500" />
      <div className="lower-section p-5">
        <div className="flex items-center gap-4">
          <div className="comments flex items-center">
            <div className="icon">
              <LuMessageSquare size={15} />
            </div>
            <div className="ms-2">{comments ? comments.length : 0}</div>
            <div className="ms-2">Comments</div>
          </div>
          <div className="attachments flex items-center">
            <div className="icon">
              <LuPaperclip size={15} />
            </div>
            <div className="ms-2">{attachments ? attachments.length : 0}</div>
            <div className="ms-2">Attachments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
