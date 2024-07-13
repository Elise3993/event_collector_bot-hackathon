"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../app/table.css";

type Event = {
  title: string;
  start_date: string;
  end_date: string;
  description: string | null;
  place: string | null;
  server_name: string;
};

const Table: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号の状態管理
  const [rowsPerPage] = useState(10); // 1ページあたりの行数の状態管理
  const [startDate, setStartDate] = useState({ year: "", month: "", day: "" }); // 範囲開始日の日付の状態管理
  const [endDate, setEndDate] = useState({ year: "", month: "", day: "" }); // 範囲終了日の日付の状態管理
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // 日時の並び替え順序の状態管理
  const [selectedTeam, setSelectedTeam] = useState<string>("全て"); // 班名の選択状態管理

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredData, setFilteredData] = useState<Event[]>([]); // フィルタリングされたデータの状態管理
  const [loading, setLoading] = useState(true); // ローディング状態の管理
  const [teams, setTeams] = useState<string[]>(["全て"]); // 班名のオプションの状態管理

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/all_events", {
          mode: "cors",
        });
        const data: Event[] = await response.json();
        setEvents(data);
        setFilteredData(data); // 初期状態でフィルタリングされたデータを設定

        // ユニークなserver_nameを抽出してteamsを更新
        const serverNames = Array.from(new Set(data.map((event: Event) => event.server_name)));
        setTeams(["全て", ...serverNames]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // データ取得完了後、ローディングを終了
      }
    };

    fetchData();
  }, []);

  const [shouldFilter, setShouldFilter] = useState(false); // フィルタリングを実行するかどうかの状態管理

  // データセット内の最も古い日時を取得
  const getEarliestDate = () => {
    return events.reduce((earliest, item) => {
      const itemDate = new Date(item.start_date);
      return itemDate < earliest ? itemDate : earliest;
    }, new Date(events[0]?.start_date));
  };

  // データセット内の最も未来の日時を取得
  const getLatestDate = () => {
    return events.reduce((latest, item) => {
      const itemDate = new Date(item.end_date);
      return itemDate > latest ? itemDate : latest;
    }, new Date(events[0]?.end_date));
  };

  // データをフィルタリングおよびソート
  useEffect(() => {
    if (shouldFilter) {
      let filtered = [...events]; // データのコピーを作成

      // 班名のフィルタリング
      if (selectedTeam !== "全て") {
        filtered = filtered.filter((item) => item.server_name === selectedTeam);
      }

      // 日付範囲のフィルタリング
      const parseDate = (dateObj: { year: string; month: string; day: string }) => {
        const { year, month, day } = dateObj;
        return new Date(`${year}-${month}-${day}`);
      };

      const start = startDate.year && startDate.month && startDate.day ? parseDate(startDate) : getEarliestDate();
      const end = endDate.year && endDate.month && endDate.day ? parseDate(endDate) : getLatestDate();

      filtered = filtered.filter((item) => {
        const itemStartDate = new Date(item.start_date);
        const itemEndDate = new Date(item.end_date);
        return itemStartDate >= start && itemEndDate <= end;
      });

      // 日時のソート
      if (sortOrder !== null) {
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.start_date).getTime();
          const dateB = new Date(b.start_date).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
      }

      setFilteredData(filtered);
      setShouldFilter(false); // フィルタリングをリセット
    }
  }, [shouldFilter, sortOrder, selectedTeam, startDate, endDate, events]);

  // ページネーションのためのデータの分割
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 入力フィールドの値が変更されたときの処理
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<React.SetStateAction<{ year: string; month: string; day: string }>>,
    field: string,
  ) => {
    const value = e.target.value;
    setDate((prevDate) => ({ ...prevDate, [field]: value }));
  };

  // 日時の並び替え順序を切り替える
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc");
    setShouldFilter(true); // フィルタリングをトリガー
  };

  // 検索ボタンが押されたときの処理
  const handleSearch = () => {
    setShouldFilter(true); // フィルタリングをトリガー
  };

  // 班名の選択が変更されたときの処理
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>プラン一覧</h1>
      <div className="filters">
        <div className="date-picker-container">
          <span className="date-picker-label">範囲日時指定：</span>
          <div className="date-picker">
            <input
              type="text"
              placeholder="年"
              value={startDate.year}
              onChange={(e) => handleInputChange(e, setStartDate, "year")}
            />
            年
            <input
              type="text"
              placeholder="月"
              value={startDate.month}
              onChange={(e) => handleInputChange(e, setStartDate, "month")}
            />
            月
            <input
              type="text"
              placeholder="日"
              value={startDate.day}
              onChange={(e) => handleInputChange(e, setStartDate, "day")}
            />
            日<span className="tilde">〜</span>
            <input
              type="text"
              placeholder="年"
              value={endDate.year}
              onChange={(e) => handleInputChange(e, setEndDate, "year")}
            />
            年
            <input
              type="text"
              placeholder="月"
              value={endDate.month}
              onChange={(e) => handleInputChange(e, setEndDate, "month")}
            />
            月
            <input
              type="text"
              placeholder="日"
              value={endDate.day}
              onChange={(e) => handleInputChange(e, setEndDate, "day")}
            />
            日
          </div>
        </div>
        <div className="team-selector">
          <label htmlFor="team-select">班名選択：</label>
          <select id="team-select" value={selectedTeam} onChange={handleTeamChange}>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>
            検索
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="header-content" scope="col">
              タイトル
            </th>
            <th className="header-team" scope="col">
              概要
            </th>
            <th className="header-price" scope="col">
              場所
            </th>
            <th className="header-date" scope="col">
              日程
              <button className="sort-button" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "■"}
              </button>
            </th>
            <th className="header-start_time" scope="col">
              開始時間
            </th>
            <th className="header-end_time" scope="col">
              終了時間
            </th>
            <th className="header-server" scope="col">
              サーバー
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="content">{row.title || "-"}</td>
              <td data-label="description" className="team">
                {row.description || "-"}
              </td>
              <td data-label="place" className="price2">
                {row.place || "-"}
              </td>
              <td data-label="start_date" className="date">
                {new Date(row.start_date).toLocaleDateString() || "-"}
              </td>
              <td data-label="start_time" className="start_time">
                {new Date(row.start_date).toLocaleTimeString() || "-"}
              </td>
              <td data-label="end_date" className="end_time">
                {new Date(row.end_date).toLocaleTimeString() || "-"}
              </td>
              <td data-label="server" className="server">
                {row.server_name || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
